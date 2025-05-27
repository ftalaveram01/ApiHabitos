import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const connectionString = dbConfig

const connection = await mysql.createConnection(connectionString)

export class UsuarioModel {
    static async login({ email, password }) {

        const [users] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (users.length === 0) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.contra);

        if (!isPasswordValid) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        return user;
    }

    static async register({ input }) {

        const { nombre, email, password } = input;

        const [users] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = users[0];

        if (user) {
            throw new Error('El email ya está en uso');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await connection.query('INSERT INTO usuarios (nombre, email, contra) VALUES (?, ?, ?)', [nombre, email, hashedPassword]);

        if (result.affectedRows === 0) {
            throw new Error('No se pudo crear el usuario');
        }

        return result;
    }

    static async updateUser(id, { nombre, email }) {

        const [users] = await connection.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
        const user = users[0];

        if (!user) {
            throw new Error('El usuario no existe');
        }

        if (user.email != email) {
            const [usersByEmail] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
            const userByEmail = usersByEmail[0];
            if (userByEmail) {
                throw new Error('El correo que intenta utilizar ya está en uso');
            }
        }

        const [usuarioActualizado] = await connection.execute('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id]);
        return usuarioActualizado;
    }

    static async updatePassword(id, { password, newPassword }) {
        const [users] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);

        if (users.length === 0) {
            throw new Error('El usuario no existe');
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.contra);

        if (!isPasswordValid) {
            throw new Error('La contraseña no es correcta');
        }

        const newPasswordHashed = await bcrypt.hash(newPassword, 10);

        const [usuarioActualizado] = await connection.execute('UPDATE usuarios SET contra = ? WHERE id = ?', [newPasswordHashed, id]);
        return usuarioActualizado;
    }

    static async deleteUser(id) {
        const [users] = await connection.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
        const user = users[0];

        if (!user) {
            throw new Error('El usuario no existe');
        }

        const [usuarioEliminado] = await connection.execute('UPDATE usuarios SET habilitado = 0 WHERE id = ?', [id]);
        return usuarioEliminado;
    }

    static async datosUsuario(id) {

        const [users] = await connection.query('SELECT u.nombre, u.email, COUNT(h.id) as numeroHabitos FROM usuarios u LEFT JOIN habitos h ON u.id = h.usuario_id AND h.habilitado = 1 WHERE u.id = ?', [id]);
        const user = users[0];

        if (!user) {
            throw new Error('El usuario no existe');
        }

        return user;
    }

}
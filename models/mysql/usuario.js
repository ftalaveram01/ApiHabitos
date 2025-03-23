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

        const [users] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

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

        console.log('user', user);

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

    static async updateUser(id, { nombre, email, password }) {

        const [users] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = users[0];

        console.log('user', user);

        if (!user) {
            throw new Error('El usuario no existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [usuarioActualizado] = await connection.execute('UPDATE usuarios SET nombre = ?, email = ?, contra = ? WHERE id = ?', [nombre, email, hashedPassword, id]);
        return usuarioActualizado;
    }

}
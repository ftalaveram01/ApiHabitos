import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const connectionString = dbConfig

const connection = await mysql.createConnection(connectionString);

export class UsuarioModel {
    static async login({ email, password }) {
        const [users] = await connection.query('SELECT * FROM usuarios WHERE email = ? AND contra = ?', [email, password]);

        if (users.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        return users[0];
    }

    static async register({ input }) {

        const { nombre, email, password } = input;

        const [users] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = users[0];

        console.log('user', user);

        if (user) {
            throw new Error('El email ya está en uso');
        }

        const [result] = await connection.query('INSERT INTO usuarios (nombre, email, contra) VALUES (?, ?, ?)', [nombre, email, password]);

        if (result.affectedRows === 0) {
            throw new Error('No se pudo crear el usuario');
        }

        return result;
    }

}





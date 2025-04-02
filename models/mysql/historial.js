import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config()

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectTimeout: 10000,
}

const connectionString = dbConfig

const connection = await mysql.createConnection(connectionString)

export class HistorialModel {

    static async getHistorial(idUsuario) {
        const [historial] = await connection.execute('SELECT hh.*, h.nombre FROM historial_habitos hh JOIN habitos h ON h.id = hh.habito_id WHERE usuario_id = ?', [idUsuario]);

        return historial[0];
    }

}
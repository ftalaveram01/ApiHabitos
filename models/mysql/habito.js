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

export class HabitoModel {

    static async getHabito({ id, idUsuario }) {
        const [habito] = await connection.execute('SELECT * FROM habitos WHERE id = ? && usuario_id = ?', [id, idUsuario]);
        return habito[0];
    }

    static async createHabito({ nombre, descripcion, usuario_id, creadoEn }) {
        const [result] = await connection.execute('INSERT INTO habitos (nombre, descripcion, usuario_id, creado_en) VALUES (?, ?, ?, ?)', [nombre, descripcion, usuario_id, creadoEn]);
        return result;
    }

    static async updateHabito({ id, nombre, descripcion }) {
        const [result] = await connection.execute('UPDATE habitos SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id]);
        return result;
    }

    static async deleteHabito({ id }) {
        const [result] = await connection.execute('DELETE FROM habitos WHERE id = ?', [id]);
        return result;
    }

    static async getHabitosUsuario({ idUsuario }) {
        const [habitos] = await connection.execute('SELECT * FROM habitos WHERE usuario_id = ?', [idUsuario]);
        return habitos;
    }

    static async getHabitosRecomendados() {
        const [habitos] = await connection.query('SELECT * FROM habitos_publicos');

        return habitos;
    }
}


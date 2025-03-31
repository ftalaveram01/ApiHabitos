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

    static async createHabito({ nombre, descripcion, usuario_id, creadoEn, publico, horasIntervalo, fechaInicio }) {

        const fecha = new Date(fechaInicio);
        fecha.setHours(fecha.getHours() + horasIntervalo);
        const fecha_nueva_actualizacion = fecha.toISOString().slice(0, 19).replace('T', ' ');
        const creadoEnFormateado = new Date(creadoEn).toISOString().slice(0, 19).replace('T', ' ');
        const habilitado = 1;

        const [result] = await connection.execute('INSERT INTO habitos (nombre, descripcion, usuario_id, creado_en, publico, fecha_nueva_actualizacion, habilitado, horas_intervalo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nombre, descripcion, usuario_id, creadoEnFormateado, publico ? 1 : 0, fecha_nueva_actualizacion, habilitado, horasIntervalo]);
        return result;
    }

    static async updateHabito({ id, nombre, descripcion }) {
        const [result] = await connection.execute('UPDATE habitos SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id]);
        return result;
    }

    static async deleteHabito({ id }) {
        const [result] = await connection.execute('UPDATE habitos SET habilitado = 0 WHERE id = ?', [id]);
        return result;
    }

    static async getHabitosUsuario({ idUsuario }) {
        const [habitos] = await connection.execute('SELECT * FROM habitos WHERE usuario_id = ? && habilitado = 1', [idUsuario]);
        return habitos;
    }

    static async getHabitosRecomendados() {
        const [habitoPublico] = await connection.execute('SELECT nombre, descripcion FROM habitos WHERE publico = 1');
        return habitoPublico;
    }
}

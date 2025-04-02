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

        return historial;
    }

    static async createHistorial(idHabito) {

        let puntual, puntuacion

        const habito = (await connection.execute('SELECT fecha_nueva_actualizacion, horas_intervalo FROM habitos WHERE id = ?', [idHabito]))[0]

        console.log('Habito con solo fecha: ', habito)

        const timestamp = new Date()
        const fechaRegistro = timestamp.toISOString().slice(0, 19).replace('T', ' ')

        if (timestamp.getTime() < new Date(habito.fecha_nueva_actualizacion).getTime()) {
            puntual = 1
            puntuacion = 10
        } else {
            puntual = 0
            puntuacion = -5
        }

        console.log('Puntual: ', puntual, ', Puntuacion: ', puntuacion)

        const [historial] = await connection.execute('INSERT INTO historial_habitos (habito_id, fecha_registro, puntual, puntuacion) VALUES (?, ?, ?, ?)', [idHabito, fechaRegistro, puntual, puntuacion])

        console.log('Historial creado: ', historial)

        const fecha = new Date(habito.fecha_nueva_actualizacion)

        console.log(fecha)
        fecha.setHours(fecha.getHours() + Number(habito.horas_intervalo))
        const nuevaFechaActualizacion = fecha.getFullYear() + '-' +
            String(fecha.getMonth() + 1).padStart(2, '0') + '-' +
            String(fecha.getDate()).padStart(2, '0') + ' ' +
            String(fecha.getHours()).padStart(2, '0') + ':' +
            String(fecha.getMinutes()).padStart(2, '0') + ':' +
            String(fecha.getSeconds()).padStart(2, '0');

        console.log(nuevaFechaActualizacion)

        const [update] = await connection.execute('UPDATE habitos SET fecha_nueva_actualizacion = ? WHERE id = ?', [nuevaFechaActualizacion, idHabito])

        console.log('UPDATE: ', update)

        return historial
    }

}
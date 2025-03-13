import ConnectionDB from "../../config/connection.js";

const connection = ConnectionDB.connect()

export class Habito {
    async getHabitos() {
        const [habitos] = await connection.execute('SELECT * FROM habitos');
        return habitos;
    }

    async getHabito(id) {
        const [habito] = await connection.execute('SELECT * FROM habitos WHERE id = ?', [id]);
        return habito[0];
    }

    async createHabito(nombre, descripcion, usuario_id, creadoEn) {
        const [result] = await connection.execute('INSERT INTO habitos (nombre, descripcion, usuario_id, creado_en) VALUES (?, ?, ?, ?)', [nombre, descripcion, usuario_id, creadoEn]);
        return result;
    }

    async updateHabito(id, nombre, descripcion) {
        const [result] = await connection.execute('UPDATE habitos SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id]);
        return result;
    }

    async deleteHabito(id) {
        const [result] = await connection.execute('DELETE FROM habitos WHERE id = ?', [id]);
        return result;
    }

    async getHabitosUsuario(idUsuario) {
        const [habitos] = await connection.execute('SELECT * FROM habitos WHERE idUsuario = ?', [idUsuario]);
        return habitos;
    }
}


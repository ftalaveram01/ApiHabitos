import ConnectionDB from "../../config/connection.js";

const connection = ConnectionDB.connect()

export class Usuario {
    async login(email, password) {
        const [users] = await connection.execute('SELECT * FROM usuario WHERE email = ? AND password = ?', [email, password]);
        return users[0];
    }

    async register(nombre, email, password) {
        const [result] = await connection.execute('INSERT INTO usuario (nombre, email, password) VALUES (?, ?)', [nombre, email, password]);
        return result;
    }

}



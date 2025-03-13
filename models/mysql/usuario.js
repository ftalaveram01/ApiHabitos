import ConnectionDB from "../../config/connection.js";

const connection = ConnectionDB.connect()

export class Usuario {
    async login(email, password) {
        const [users] = await connection.execute('SELECT * FROM usuario WHERE email = ? AND contra = ?', [email, password]);

        if (users.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        return users[0];
    }

    async register(nombre, email, password) {

        const user = await this.getUserByEmail(email);

        if (user) {
            throw new Error('El email ya está en uso');
        }

        const [result] = await connection.execute('INSERT INTO usuario (nombre, email, contra) VALUES (?, ?)', [nombre, email, password]);

        if (result.affectedRows === 0) {
            throw new Error('No se pudo crear el usuario');
        }

        return result;
    }


}

const getUserByEmail = async (email) => {
    const [users] = await connection.execute('SELECT * FROM usuario WHERE email = ?', [email]);
    return users[0];
}



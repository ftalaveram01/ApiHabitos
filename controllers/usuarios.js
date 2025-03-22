import { validateUser, validatePartialUser } from "../schemas/usuarios.js";

export class UsuariosController {
    constructor({ usuarioModel }) {
        this.usuarioModel = usuarioModel
    }

    loginUser = async (req, res) => {
        try {
            const email = req.query.email;
            const password = req.query.password;

            const user = await this.usuarioModel.login({ email, password });

            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    registerUser = async (req, res) => {
        try {
            const usuario = validateUser(req.body);

            if (!usuario.success) {
                res.status(400).json({ error: usuario.error });
                return;
            }

            const newUser = await this.usuarioModel.register({ input: usuario.data });
            res.status(201).json(newUser);
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, email, password } = req.body;
            const updatedUser = await this.usuarioModel.updateUser(parseInt(id), { nombre, email, password });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            await this.usuarioModel.deleteUser(parseInt(id));
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
import { validateUser, validatePartialUser } from "../schemas/usuarios";

export class UsuariosController {
    constructor({ usuariosService }) {
        this.usuariosService = usuariosService;
    }

    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await this.usuariosService.login(email, password);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    registerUser = async (req, res) => {
        try {
            const usuario = req.body;
            const { value: user, error } = validateUser(usuario);
            if (error) {
                throw new Error(error);
            }
            const newUser = await this.usuariosService.createUser(usuario);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = req.body;
            const updatedUser = await this.usuariosService.updateUser(parseInt(id), usuario);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            await this.usuariosService.deleteUser(parseInt(id));
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
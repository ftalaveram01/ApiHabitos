import { validateUser, validatePartialUser } from "../schemas/usuarios.js";
import jwt from 'jsonwebtoken';

export class UsuariosController {
    constructor({ usuarioModel }) {
        this.usuarioModel = usuarioModel
    }

    loginUser = async (req, res) => {
        try {
            const email = req.query.email;
            const password = req.query.password;

            const user = await this.usuarioModel.login({ email, password });

            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '100h' });
            
            res.status(200).json({ token });
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

    verifyUserToken = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ valid: false, message: 'No token provided' });
            }
    
            // Verificamos el token primero
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            // Respuesta exitosa
            res.json({ 
                valid: true
            });
            
        } catch (error) {
            // Manejo de diferentes tipos de errores
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ valid: false, message: 'Token expired' });
            }
            
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ valid: false, message: 'Invalid token' });
            }
            
            // Error general del servidor
            console.error('Error en validateToken:', error);
            res.status(500).json({ valid: false, message: 'Internal server error' });
        }
    }
}
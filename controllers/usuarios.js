import { validateUser, validatePartialUser } from "../schemas/usuarios.js";
import jwt from 'jsonwebtoken';

export class UsuariosController {
    constructor({ usuarioModel }) {
        this.usuarioModel = usuarioModel
    }

    loginUser = async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user = await this.usuarioModel.login({ email, password });
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

            res.status(200).cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 200
            }).json({
                success: true,
                user: { id: user.id, email: user.email },
                token: token
            });
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
            res.status(400).json({ error: error.message });
        }
    }

    logoutUser = async (req, res) => {
        try {
            res.cookie("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                expires: new Date(1970, 1, 1)
            })

            console.log("Cookie de token eliminada: ", res.cookies);

            res.status(200).json({
                success: true,
                message: "Logged out successfully"
            });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    getUserData = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                return res.status(401).json({ valid: false, message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const id = decoded.id;

            const data = await this.usuarioModel.datosUsuario(id);

            res.status(200).json({
                nombre: data.nombre,
                email: data.email,
                numeroHabitos: data.numeroHabitos
            })
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Token expired' });
            }

            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
            }

            if (error.status === 400) {
                return res.status(400).json({ error: 'Error de envio de datos' })
            }

            res.status(500).json({ isAuthenticated: false, message: 'Internal server error' });
        }
    }

    updateUser = async (req, res) => {
        try {

            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                return res.status(401).json({ valid: false, message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const id = decoded.id;

            const { nombre, email } = req.body;

            const updatedUser = await this.usuarioModel.updateUser(parseInt(id), { nombre, email });
            res.status(200).json({
                success: true
            });
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Token expired' });
            }

            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
            }

            if (error.status === 400) {
                return res.status(400).json({ error: 'Error de envio de datos' })
            }

            res.status(500).json({ isAuthenticated: false, message: 'Internal server error' });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                return res.status(401).json({ valid: false, message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const id = decoded.id;

            await this.usuarioModel.deleteUser(parseInt(id));
            res.status(204).json({
                success: true
            });
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Token expired' });
            }

            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
            }

            if (error.status === 400) {
                return res.status(400).json({ error: 'Error de envio de datos' })
            }

            res.status(500).json({ isAuthenticated: false, message: 'Internal server error' });
        }
    }

    verifyUserToken = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                return res.status(401).json({ valid: false, message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            res.json({
                isAuthenticated: true
            });

        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Token expired' });
            }

            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
            }

            res.status(500).json({ isAuthenticated: false, message: 'Internal server error' });
        }
    }
}
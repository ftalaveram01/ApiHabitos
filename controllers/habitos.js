import jwt from 'jsonwebtoken';

export class HabitosController {
    constructor({ habitoModel }) {
        this.habitoModel = habitoModel
    }

    getHabito = async (req, res) => {
        try {
            const { id } = req.params;
            const { idUsuario } = req.body;

            const habito = await this.habitoModel.getHabito({ id, idUsuario });
            res.status(200).json(habito);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    createHabito = async (req, res) => {
        try {

            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                res.status(401).json({ valid: 'false', message: 'No token provided' });
                return;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const usuario_id = decoded.id;

            const { nombre, descripcion, creadoEn, publico, horasIntervalo, fechaInicio } = req.body;

            console.log("Tipo de fechaInicio: ", fechaInicio)

            const newHabito = await this.habitoModel.createHabito({ nombre, descripcion, usuario_id, creadoEn, publico, horasIntervalo, fechaInicio });

            res.status(201).json({
                success: true
            });
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Token expired' });
            }

            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
            }

            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    updateHabito = async (req, res) => {
        try {

            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                res.status(401).json({ valid: 'false', message: 'No token provided' });
                return;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const usuario_id = decoded.id;

            const { id } = req.params;

            const habito = await this.habitoModel.getHabito({ id, usuario_id });

            if (!habito) {
                res.status(401).json({ valid: 'false', message: 'The user dont have that habit' });
                return;
            }

            const { nombre, descripcion, publico } = req.body;
            const updatedHabito = await this.habitoModel.updateHabito({ id, nombre, descripcion, publico });
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

            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    deleteHabito = async (req, res) => {
        try {
            const { id } = req.params;

            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                res.status(401).json({ valid: 'false', message: 'No token provided' });
                return;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const idUsuario = decoded.id;

            const habito = await this.habitoModel.getHabito({ id, idUsuario });

            console.log(habito)

            if (!habito) {
                res.status(401).json({ valid: 'false', message: 'The user dont have that habit' });
                return;
            }

            const respuesta = await this.habitoModel.deleteHabito({ id });
            res.status(204).json();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Token expired' });
            }

            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
            }

            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    getHabitosUsuario = async (req, res) => {
        try {

            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                res.status(401).json({ valid: 'false', message: 'No token provided' });
                return;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const idUsuario = decoded.id;

            const habitos = await this.habitoModel.getHabitosUsuario({ idUsuario });

            const habitosReducidos = habitos.map(habito => {
                const { id, nombre, descripcion, fecha_nueva_actualizacion, publico } = habito;
                return { id, nombre, descripcion, fecha_nueva_actualizacion, publico };
            });

            res.status(200).json(habitosReducidos);
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Token expired' });
            }

            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
            }

            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    getHabitosRecomendados = async (req, res) => {
        try {
            const habitos = await this.habitoModel.getHabitosRecomendados();
            res.status(200).json(habitos);
        } catch (error) {
            res.status(error.status).json({ error: error.message })
        }
    }
}
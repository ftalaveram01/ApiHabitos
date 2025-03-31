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
            const newHabito = await this.habitoModel.createHabito({ nombre, descripcion, usuario_id, creadoEn, publico, horasIntervalo, fechaInicio });
            res.status(201).json(newHabito);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    updateHabito = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;
            const updatedHabito = await this.habitoModel.updateHabito({ id, nombre, descripcion });
            res.status(200).json(updatedHabito);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteHabito = async (req, res) => {
        try {
            const { id } = req.params;
            await this.habitoModel.deleteHabito({ id });
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
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
                const { nombre, descripcion, creado_en } = habito;
                return { nombre, descripcion, creado_en };
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
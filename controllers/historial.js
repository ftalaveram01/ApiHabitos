import jwt from 'jsonwebtoken';

export class HistorialController {
    constructor({ historialModel }) {
        this.historialModel = historialModel
    }

    getHistorial = async (req, res) => {
        try {

            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                res.status(401).json({ valid: 'false', message: 'No token provided' });
                return;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const usuario_id = decoded.id;

            const historial = await this.historialModel.getHistorial(usuario_id)

            res.status(200).json(historial);
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

    createHistorial = async (req, res) => {
        try {

            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                res.status(401).json({ valid: 'false', message: 'No token provided' });
                return;
            }

            const { id } = req.params;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const historial = await this.historialModel.createHistorial(id)

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
}
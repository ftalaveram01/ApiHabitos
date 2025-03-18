

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
            const { nombre, descripcion, usuario_id, creadoEn } = req.body;
            const newHabito = await this.habitoModel.createHabito({ nombre, descripcion, usuario_id, creadoEn });
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
            const { idUsuario } = req.params;
            console.log('idUsuario', idUsuario);
            const habitos = await this.habitoModel.getHabitosUsuario({ idUsuario });
            res.status(200).json(habitos);
        } catch (error) {
            res.status(400).json({ error: error.message });
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
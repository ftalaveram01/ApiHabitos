import Router from "express";
import { HistorialController } from "../controllers/historial.js";

export const createHistorialRouter = ({ historialModel }) => {
    const historialRouter = new Router()

    const historialController = new HistorialController({ historialModel })

    historialRouter.get('/', historialController.getHistorial)
    historialRouter.post('/:id', historialController.createHitorial)

    return historialRouter
}
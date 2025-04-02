import Router from "express";
import { HistorialController } from "../controllers/historial";

export const createHistorialRouter = ({ historialModel }) => {
    const historialRouter = new Router()

    const historialController = new HistorialController({ historialModel })

    historialRouter.get('/', historialController.getHistorial)


    return habitoRouter
}
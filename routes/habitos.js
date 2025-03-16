import Router from "express";
import { HabitosController } from "../controllers/habitos.js";

export const createHabitosRouter = ({ habitoModel }) => {
    const habitoRouter = Router()

    const habitosController = new HabitosController({ habitoModel })

    habitoRouter.get('/:id', habitosController.getHabito)
    habitoRouter.post('/', habitosController.createHabito)
    habitoRouter.put('/:id', habitosController.updateHabito)
    habitoRouter.delete('/:id', habitosController.deleteHabito)
    habitoRouter.get('/usuario/:idUsuario', habitosController.getHabitosUsuario)

    return habitoRouter
}
import Router from "express";
import { HabitosController } from "../controllers/habitos.js";

export const createHabitosRouter = ({ habitoModel }) => {
    const habitoRouter = new Router()

    const habitosController = new HabitosController({ habitoModel })

    habitoRouter.get('/recomendados', habitosController.getHabitosRecomendados)
    habitoRouter.get('/usuario', habitosController.getHabitosUsuario)

    habitoRouter.get('/:id', habitosController.getHabito)
    habitoRouter.post('/', habitosController.createHabito)
    habitoRouter.put('/:id', habitosController.updateHabito)
    habitoRouter.delete('/:id', habitosController.deleteHabito)


    return habitoRouter
}
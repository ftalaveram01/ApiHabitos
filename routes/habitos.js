import Router from "express";
import { HabitosController } from "../controllers/habitos.js";

export const createHabitosRouter = ({ habitoModel }) => {
    const habitoRouter = new Router()

    const habitosController = new HabitosController({ habitoModel })

    habitoRouter.get('/recomendados', habitosController.getHabitosRecomendados)
    habitoRouter.get('/usuario/:idUsuario', habitosController.getHabitosUsuario)

    // id implicito en el token, no hace falta en la ruta
    habitoRouter.get('/', habitosController.getHabito) // ❌
    habitoRouter.post('/', habitosController.createHabito) // ✅
    habitoRouter.put('/', habitosController.updateHabito) // ❌
    habitoRouter.delete('/', habitosController.deleteHabito) // ❌


    return habitoRouter
}
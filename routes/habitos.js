import Router from "express";
import { HabitosController } from "../controllers/habitos.js";

export const createHabitosRouter = ({ habitoModel }) => {
    const habitoRouter = new Router()

    const habitosController = new HabitosController({ habitoModel })

    habitoRouter.get('/recomendados', habitosController.getHabitosRecomendados)
    habitoRouter.get('/usuario', habitosController.getHabitosUsuario)

    habitoRouter.get('/:id', habitosController.getHabito) // 🔍 observar si viene token y si coincide con la id con la del habito y ademas observar si se pide un habito publico o privado
    habitoRouter.post('/', habitosController.createHabito)
    habitoRouter.put('/:id', habitosController.updateHabito) // 🔍 observar si viene token y si coincide con la id con la del habito
    habitoRouter.delete('/:id', habitosController.deleteHabito) // 🔍 observar si viene token y si coincide con la id con la del habito


    return habitoRouter
}
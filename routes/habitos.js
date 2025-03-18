import Router from "express";
import { HabitosController } from "../controllers/habitos.js";

export const createHabitosRouter = ({ habitoModel }) => {
    const habitoRouter = new Router()

    const habitosController = new HabitosController({ habitoModel })

    habitoRouter.use((req, res, next) => {
        console.log(`Solicitud recibida: ${req.method} ${req.url}`);
        next();
    });

    habitoRouter.get('/recomendados', habitosController.getHabitosRecomendados)
    habitoRouter.get('/usuario/:idUsuario', habitosController.getHabitosUsuario)
    habitoRouter.get('/:id', habitosController.getHabito)
    habitoRouter.post('/', habitosController.createHabito)
    habitoRouter.put('/:id', habitosController.updateHabito)
    habitoRouter.delete('/:id', habitosController.deleteHabito)


    return habitoRouter
}
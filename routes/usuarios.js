import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.js";

export const createUsuariosRouter = ({ usuarioModel }) => {
    const userRouter = Router()

    const usuariosController = new UsuariosController({ usuarioModel })

    // AUTH
    userRouter.get('/login', usuariosController.loginUser)
    userRouter.post('/register', usuariosController.registerUser)

    // USER POSIBLE ACTIONS
    userRouter.put('/:id', usuariosController.updateUser)
    userRouter.delete('/:id', usuariosController.deleteUser)

    userRouter.get('/verifyaccess', usuariosController.verifyUserToken)

    return userRouter
}
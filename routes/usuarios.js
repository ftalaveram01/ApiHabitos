import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.js";
import { verifyToken } from "../middlewares/userVerify.js";

export const createUsuariosRouter = ({ usuarioModel }) => {
    const userRouter = Router()

    const usuariosController = new UsuariosController({ usuarioModel })

    // AUTH
    userRouter.get('/login', usuariosController.loginUser)
    userRouter.post('/register', usuariosController.registerUser)

    // USER POSIBLE ACTIONS
    userRouter.put('/:id', verifyToken, usuariosController.updateUser)
    userRouter.delete('/:id', verifyToken, usuariosController.deleteUser)

    return userRouter
}
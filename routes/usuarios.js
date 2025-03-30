import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.js";

export const createUsuariosRouter = ({ usuarioModel }) => {
    const userRouter = Router()

    const usuariosController = new UsuariosController({ usuarioModel })

    // AUTH
    userRouter.post('/login', usuariosController.loginUser)
    userRouter.post('/register', usuariosController.registerUser)
    userRouter.post('/logout', usuariosController.logoutUser)

    // USER POSIBLE ACTIONS
    userRouter.put('/:id', usuariosController.updateUser) // ❌ No hace falta la id del usuario, viene en el token
    userRouter.delete('/:id', usuariosController.deleteUser) // ❌ No hace falta la id del usuario, viene en el token
    userRouter.get('/datauser', usuariosController.getUserData)

    userRouter.get('/verifyaccess', usuariosController.verifyUserToken)

    return userRouter
}
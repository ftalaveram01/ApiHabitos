import express, { json } from 'express';
import { createUsuariosRouter } from './routes/usuarios.js';
import { createHabitosRouter } from './routes/habitos.js';
import { corsMiddleware } from './middlewares/cors.js';
import { UsuarioModel } from './models/mysql/usuario.js'
import { HabitoModel } from './models/mysql/habito.js'
import cookieParser from 'cookie-parser';
import 'dotenv/config.js';

const app = express();
app.use(json());
app.use(cookieParser());
app.use(corsMiddleware());
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By')
    next()
})

app.use('/usuarios', createUsuariosRouter({ usuarioModel: UsuarioModel }));
app.use('/habitos', createHabitosRouter({ habitoModel: HabitoModel }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
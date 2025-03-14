import express, { json } from 'express';
import { createUsuariosRouter } from './routes/usuarios.js';
import { corsMiddleware } from './middlewares/cors.js';
import { UsuarioModel } from './models/mysql/usuario.js'
import 'dotenv/config.js';

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

app.use('/usuarios', createUsuariosRouter({ usuarioModel: UsuarioModel }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
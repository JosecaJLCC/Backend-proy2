import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
//El nombre de persona puede ser cualquiera
import personaRoutes from './routes/persona.routes.js'
import usuarioRoutes from './routes/usuario.routes.js'

//prueba para guardar imagenes
import path from 'path'
import { fileURLToPath } from 'url';
//

const app = express();

app.use(express.json());
//middlewares
app.use(morgan('env'));
app.use(cors());

app.use(personaRoutes);
app.use(usuarioRoutes)

//public static files prueba para guardar imagenes

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../static')))

//


app.use((req, res, next) => {
    res.status(404).json({
        message:"endpoint Not Found by Joseca"
    })
})


export default app;
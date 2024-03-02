import express, { urlencoded } from 'express'
import morgan from 'morgan';
import cors from 'cors'
import bodyParser from 'body-parser'
import personaRoutes from './routes/persona.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import chatGptRoutes from './routes/chatGpt.routes.js'
import contactoRoutes from './routes/contacto.routes.js'
//import chat from './routes/chat.routes.js';

//prueba para guardar imagenes
import path from 'path'
import { fileURLToPath } from 'url';
//

//Para el chatbot

//



const app = express();

app.use(urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());
//middlewares
app.use(morgan('env'));
app.use(cors());

app.use(personaRoutes);
app.use(usuarioRoutes);
app.use(chatGptRoutes);
app.use(contactoRoutes);
//app.use(chat);

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
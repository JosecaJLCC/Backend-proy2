import app from './app.js'
import {port} from './config.js'

app.listen(port);
console.log("Servidor escuchando en el puerto ",port)


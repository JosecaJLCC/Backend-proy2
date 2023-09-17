import express from 'express'
//El nombre de persona puede ser cualquiera
import personaRoutes from './routes/persona.routes.js'
import usuarioRoutes from './routes/usuario.routes.js'

const app = express();

app.use(express.json());

app.use(personaRoutes);
app.use(usuarioRoutes)


app.use((req, res) => {
    res.status(404).json({
        message:"endpoint Not Found by Joseca"
    })
})

export default app;
import { Router } from "express";

import {getUsuario,createUsuario, updateUsuario, deleteUsuario, getUsuariosByIdUsuario} from '../controllers/usuario.controller.js'

const router = Router()
//rutas de usuarios
router.get('/Usuarios', getUsuario);
router.post('/Usuarios',createUsuario);
router.patch('/Usuarios/:idUsuario',updateUsuario);
router.delete('/Usuarios/:idUsuario',deleteUsuario);
router.get('/Usuarios/:idUsuario',getUsuariosByIdUsuario);



export default router;
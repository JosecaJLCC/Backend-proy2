import { Router } from "express";

import {getUsuario,createUsuario, updateUsuario, deleteUsuario, getUsuariosByIdUsuario, login} from '../controllers/usuario.controller.js'

const router = Router()

router.get('/usuarios', getUsuario);
router.post('/usuarios',createUsuario);
router.patch('/usuarios/:idUsuario',updateUsuario);
router.delete('/usuarios/:idUsuario',deleteUsuario);
router.get('/usuarios/:idUsuario',getUsuariosByIdUsuario);
router.post('/usuarios/login', login);



export default router;
import { Router } from "express";
//prueba para cargar img
import storage from '../multer.js'
import multer from 'multer'
const uploader = multer({storage});
//
import {getUsuario,createUsuario, updateUsuario, deleteUsuario, getUsuariosByIdUsuario, login, ensureToken} from '../controllers/usuario.controller.js'


const router = Router()

router.get('/usuarios', getUsuario);
router.post('/usuarios',uploader.single('file'), createUsuario);
router.patch('/usuarios/:idUsuario',updateUsuario);
router.delete('/usuarios/:idUsuario',deleteUsuario);
router.get('/usuarios/:ciPersona',getUsuariosByIdUsuario);
router.post('/usuarios/login', login);




export default router;
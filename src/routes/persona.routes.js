import { Router } from "express";

import {getPersona,createPersona, updatePersona, deletePersona, getPersonasByCi} from '../controllers/persona.controller.js'

const router = Router()
//rutas de personas
router.get('/personas', getPersona);
router.post('/personas',createPersona);
router.patch('/personas/:ci',updatePersona);
router.delete('/personas/:ci',deletePersona);
router.get('/personas/:ci',getPersonasByCi);



export default router;
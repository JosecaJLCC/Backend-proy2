import { Router } from "express";

import {getContacto,createContacto, getContactosByIdContacto} from '../controllers/contacto.controller.js'

const router = Router()

router.get('/contactos', getContacto);
router.post('/contactos',createContacto);
router.get('/contactos/:id',getContactosByIdContacto);



export default router;
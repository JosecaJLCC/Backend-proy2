import { Router } from "express";

import {askToChatGpt} from '../controllers/chatGpt.controller.js'

const router = Router()
router.post('/chatbot',askToChatGpt);

export default router;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _personaController = require("../controllers/persona.controller.js");
var router = (0, _express.Router)();
router.get('/personas', _personaController.getPersona);
router.post('/personas', _personaController.createPersona);
router.patch('/personas/:ci', _personaController.updatePersona);
router["delete"]('/personas/:ci', _personaController.deletePersona);
router.get('/personas/:ci', _personaController.getPersonasByCi);
var _default = router;
exports["default"] = _default;
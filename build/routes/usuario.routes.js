"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _usuarioController = require("../controllers/usuario.controller.js");
var router = (0, _express.Router)();
router.get('/usuarios', _usuarioController.getUsuario);
router.post('/usuarios', _usuarioController.createUsuario);
router.patch('/usuarios/:idUsuario', _usuarioController.updateUsuario);
router["delete"]('/usuarios/:idUsuario', _usuarioController.deleteUsuario);
router.get('/usuarios/:idUsuario', _usuarioController.getUsuariosByIdUsuario);
router.post('/login', _usuarioController.loginUsuario);
var _default = router;
exports["default"] = _default;
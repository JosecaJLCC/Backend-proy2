"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _personaRoutes = _interopRequireDefault(require("./routes/persona.routes.js"));
var _usuarioRoutes = _interopRequireDefault(require("./routes/usuario.routes.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//El nombre de persona puede ser cualquiera

var app = (0, _express["default"])();

//para el uso de cors en peticiones http
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_personaRoutes["default"]);
app.use(_usuarioRoutes["default"]);
app.use(function (req, res, next) {
  res.status(404).json({
    message: "endpoint Not Found by Joseca"
  });
});
var _default = app;
exports["default"] = _default;
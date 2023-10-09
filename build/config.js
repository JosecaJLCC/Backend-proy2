"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.port = exports.db_user = exports.db_port = exports.db_password = exports.db_host = exports.db_database = exports.SECRET = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var port = process.env.PORT || 3000;
exports.port = port;
var db_user = process.env.DB_USER || 'root';
exports.db_user = db_user;
var db_password = process.env.DB_PASSWORD || '123456';
exports.db_password = db_password;
var db_host = process.env.DB_HOST || 'localhost';
exports.db_host = db_host;
var db_database = process.env.DB_DATABASE || 'sistema_denuncia';
exports.db_database = db_database;
var db_port = process.env.DB_PORT || '3306';
exports.db_port = db_port;
var SECRET = 'sistema_denuncia_jlcc';
exports.SECRET = SECRET;
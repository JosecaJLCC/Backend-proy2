"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;
var _promise = require("mysql2/promise");
var _config = require("./config.js");
var pool = (0, _promise.createPool)({
  host: _config.db_host,
  user: _config.db_user,
  password: _config.db_password,
  port: _config.db_port,
  database: _config.db_database
});
exports.pool = pool;
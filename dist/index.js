"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _models = _interopRequireDefault(require("../db/models"));

//const http = require('http');
_dotenv["default"].config();
/**
 * Get port from environment and store in Express.
 */


var port = process.env.port || 3000;

_app["default"].set('port', port);
/**
 * Create HTTP server.
 */


var server = _http["default"].createServer(_app["default"]);

var start = function start() {
  try {
    _models["default"].Sequelize.authenticate().then(function () {
      console.log('Connection has been established successfully.');
    })["catch"](function (err) {
      console.error('Unable to connect to the database:', err);
    });

    _models["default"].sequelize.sync().then(function () {
      server.listen(port, function () {
        console.log("Api up and running at: http://localhost:" + port);
      });
    });

    ;
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

start();
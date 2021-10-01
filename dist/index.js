"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

var _xssClean = _interopRequireDefault(require("xss-clean"));

var _cors = _interopRequireDefault(require("cors"));

var _hpp = _interopRequireDefault(require("hpp"));

var _path = _interopRequireDefault(require("path"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _apolloServerExpress = require("apollo-server-express");

var _graphqlUpload = require("graphql-upload");

var _typeDefs = _interopRequireDefault(require("./graphql/typeDefs"));

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

var _morgan = _interopRequireDefault(require("morgan"));

var _models = _interopRequireDefault(require("../db/models/"));

var app = (0, _express["default"])();
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use('/uploads', _express["default"]["static"](_path["default"].join(__dirname, '../uploads/')));
app.use((0, _helmet["default"])()); // Set security headers

app.use((0, _morgan["default"])("dev"));
app.use((0, _xssClean["default"])()); // Prevent xss attacks

app.use((0, _hpp["default"])()); // Prevent http param polution

app.use((0, _compression["default"])());
app.use((0, _cors["default"])());

function startServer() {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var server, app;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            server = new _apolloServerExpress.ApolloServer({
              typeDefs: _typeDefs["default"],
              resolvers: _resolvers["default"],
              context: function context(req) {
                return {
                  req: req,
                  db: _models["default"]
                };
              }
            });
            _context.next = 3;
            return server.start();

          case 3:
            app = (0, _express["default"])(); // This middleware should be added before calling `applyMiddleware`.

            app.use((0, _graphqlUpload.graphqlUploadExpress)());
            server.applyMiddleware({
              app: app
            });
            _context.next = 8;
            return new Promise(function (r) {
              return app.listen({
                port: 4000
              }, r);
            });

          case 8:
            console.log("\uD83D\uDE80 Server ready at http://localhost:4000".concat(server.graphqlPath));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startServer.apply(this, arguments);
}

startServer();
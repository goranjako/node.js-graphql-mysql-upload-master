"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _compression = _interopRequireDefault(require("compression"));

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _xssClean = _interopRequireDefault(require("xss-clean"));

var _cors = _interopRequireDefault(require("cors"));

var _hpp = _interopRequireDefault(require("hpp"));

var _path = _interopRequireDefault(require("path"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _errorHandler = require("./middlewere/errorHandler");

var _apolloServerExpress = require("apollo-server-express");

var _shemas = _interopRequireDefault(require("./graphql/shemas"));

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

var app = (0, _express["default"])();

_dotenv["default"].config(); // enable cors


var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};
app.use((0, _cors["default"])(corsOption)); // view engine setup

app.set("views", _path["default"].join(__dirname, "views"));
app.set("view engine", "jade");
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
app.use((0, _helmet["default"])()); // Set security headers

app.use((0, _xssClean["default"])()); // Prevent xss attacks

app.use((0, _hpp["default"])()); // Prevent http param polution

app.use((0, _compression["default"])()); // Rate limiting

var limiter = (0, _expressRateLimit["default"])({
  windowMs: 10 * 60 * 1000,
  // 10 minuates
  max: 100 // 100 requests

});
app.use(limiter); // Catch all route

app.use("*", function (req, res) {
  res.status(404).json({
    error: "Not a valid route"
  });
}); // error handler

app.use(_errorHandler.notFound);
app.use(_errorHandler.errorHandler);

function startServer() {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var server;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            server = new _apolloServerExpress.ApolloServer({
              typeDefs: _shemas["default"],
              resolvers: _resolvers["default"]
            });
            _context.next = 3;
            return server.start();

          case 3:
            // This middleware should be added before calling `applyMiddleware`.
            server.applyMiddleware({
              app: app
            });
            _context.next = 6;
            return new Promise(function (r) {
              return app.listen({
                port: 4000
              }, r);
            });

          case 6:
            console.log("\uD83D\uDE80 Server ready at http://localhost:4000".concat(server.graphqlPath));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startServer.apply(this, arguments);
}

startServer();
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _verify = require("../../middlewere/verify");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var resolver = {
  Query: {
    //Login
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(paren, _ref, _ref2) {
        var input, db, user, isEqual, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                input = _ref.input;
                db = _ref2.db;
                _context.next = 4;
                return _verify.signIn.validate(input, {
                  abortEarly: false
                });

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return db.User.findOne({
                  where: {
                    email: input.email
                  }
                });

              case 7:
                user = _context.sent;

                if (user) {
                  _context.next = 10;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("User  not found");

              case 10:
                _context.next = 12;
                return _bcryptNodejs["default"].compareSync(input.password, user.password);

              case 12:
                isEqual = _context.sent;

                if (isEqual) {
                  _context.next = 15;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("Wrong credentials!");

              case 15:
                token = _jsonwebtoken["default"].sign({
                  user: user
                }, process.env.SECRET_KEY, {
                  expiresIn: 60 * 60
                });
                return _context.abrupt("return", {
                  token: token
                });

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](4);
                throw _context.t0;

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 19]]);
      }));

      function login(_x, _x2, _x3) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  },
  Mutation: {
    //Register
    register: function () {
      var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(paren, _ref3, _ref4) {
        var input, db, user, newUser, saveduser, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = _ref3.input;
                db = _ref4.db;
                _context2.next = 4;
                return _verify.signUp.validate(input, {
                  abortEarly: false
                });

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return db.User.findOne({
                  where: {
                    email: input.email
                  }
                });

              case 7:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 10;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("User already Exists");

              case 10:
                newUser = {
                  fullName: input.fullName,
                  email: input.email,
                  password: input.password
                };
                _context2.next = 13;
                return db.User.create(newUser);

              case 13:
                saveduser = _context2.sent;
                token = _jsonwebtoken["default"].sign({
                  saveduser: saveduser
                }, process.env.SECRET_KEY, {
                  expiresIn: 60 * 60
                });
                return _context2.abrupt("return", {
                  token: token
                });

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](4);
                throw _context2.t0;

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 18]]);
      }));

      function register(_x4, _x5, _x6) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }
};
module.exports = resolver;
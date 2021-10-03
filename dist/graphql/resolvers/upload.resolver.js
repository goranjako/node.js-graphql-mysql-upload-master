"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphqlUpload = require("graphql-upload");

var _apolloServerExpress = require("apollo-server-express");

var _auth = _interopRequireDefault(require("../../middlewere/auth"));

var _fs = require("fs");

var resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: _graphqlUpload.GraphQLUpload,
  Query: {
    uploads: function () {
      var _uploads = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, _ref) {
        var req, db, pictures;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req = _ref.req, db = _ref.db;
                _context.next = 3;
                return (0, _auth["default"])(req);

              case 3:
                _context.prev = 3;
                _context.next = 6;
                return db.Uploads.findAll();

              case 6:
                pictures = _context.sent;
                return _context.abrupt("return", pictures);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                throw new _apolloServerExpress.UserInputError("Pictures not found");

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 10]]);
      }));

      function uploads(_x, _x2, _x3) {
        return _uploads.apply(this, arguments);
      }

      return uploads;
    }()
  },
  Mutation: {
    singleUpload: function () {
      var _singleUpload = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref2, _ref3) {
        var input, req, db, _yield$input$image, createReadStream, filename, mimetype, encoding, stream, paths, out, url, user, newPhoto, pictures;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = _ref2.input;
                req = _ref3.req, db = _ref3.db;
                _context2.prev = 2;
                _context2.next = 5;
                return input.image;

              case 5:
                _yield$input$image = _context2.sent;
                createReadStream = _yield$input$image.createReadStream;
                filename = _yield$input$image.filename;
                mimetype = _yield$input$image.mimetype;
                encoding = _yield$input$image.encoding;
                // Invoking the `createReadStream` will return a Readable Stream.
                // See https://nodejs.org/api/stream.html#stream_readable_streams
                stream = createReadStream();
                paths = "uploads/".concat(filename); // This is purely for demonstration purposes and will overwrite the
                // local-file-output.txt in the current working directory on EACH upload.

                out = require('fs').createWriteStream(paths);
                stream.pipe(out);
                url = 'http://localhost:4000/uploads/' + filename;
                _context2.next = 17;
                return db.Uploads.findOne({
                  where: {
                    url: url
                  }
                });

              case 17:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 20;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("Url already Exists");

              case 20:
                newPhoto = {
                  url: url,
                  categories: input.categories
                };
                _context2.next = 23;
                return db.Uploads.create(newPhoto);

              case 23:
                pictures = _context2.sent;
                return _context2.abrupt("return", pictures);

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2["catch"](2);
                throw _context2.t0;

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 27]]);
      }));

      function singleUpload(_x4, _x5, _x6) {
        return _singleUpload.apply(this, arguments);
      }

      return singleUpload;
    }(),
    deleteImg: function () {
      var _deleteImg = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, _ref4, _ref5) {
        var id, req, db, pictures;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref4.id;
                req = _ref5.req, db = _ref5.db;
                _context3.next = 4;
                return (0, _auth["default"])(req);

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return db.Uploads.destroy({
                  where: {
                    id: id
                  }
                });

              case 7:
                pictures = _context3.sent;
                return _context3.abrupt("return", {
                  message: "Successful Delete Picture"
                });

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](4);
                throw new _apolloServerExpress.UserInputError("Picture not found");

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 11]]);
      }));

      function deleteImg(_x7, _x8, _x9) {
        return _deleteImg.apply(this, arguments);
      }

      return deleteImg;
    }()
  }
};
module.exports = resolvers;
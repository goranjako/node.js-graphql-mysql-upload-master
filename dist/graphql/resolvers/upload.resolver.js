"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphqlUpload = require("graphql-upload");

var _apolloServerExpress = require("apollo-server-express");

var _auth = _interopRequireDefault(require("../../middlewere/auth"));

var resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: _graphqlUpload.GraphQLUpload,
  Mutation: {
    singleUpload: function () {
      var _singleUpload = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref, _ref2) {
        var input, req, db, _yield$input$image, createReadStream, filename, mimetype, encoding, stream, paths, out, url, user, newPhoto, pictures;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                input = _ref.input;
                req = _ref2.req, db = _ref2.db;
                _context.prev = 2;
                _context.next = 5;
                return input.image;

              case 5:
                _yield$input$image = _context.sent;
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
                _context.next = 17;
                return db.Uploads.findOne({
                  where: {
                    url: url
                  }
                });

              case 17:
                user = _context.sent;

                if (!user) {
                  _context.next = 20;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("Url already Exists");

              case 20:
                newPhoto = {
                  url: url,
                  categories: input.categories
                };
                _context.next = 23;
                return db.Uploads.create(newPhoto);

              case 23:
                pictures = _context.sent;
                return _context.abrupt("return", pictures);

              case 27:
                _context.prev = 27;
                _context.t0 = _context["catch"](2);
                throw _context.t0;

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 27]]);
      }));

      function singleUpload(_x, _x2, _x3) {
        return _singleUpload.apply(this, arguments);
      }

      return singleUpload;
    }()
  }
};
module.exports = resolvers;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('graphql-upload'),
    GraphQLUpload = _require.GraphQLUpload,
    graphqlUploadExpress = _require.graphqlUploadExpress;

var resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,
  Mutation: {
    singleUpload: function () {
      var _singleUpload = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref) {
        var file, _yield$file, createReadStream, filename, mimetype, encoding, stream, paths, out, photo;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                file = _ref.file;
                _context.next = 3;
                return file;

              case 3:
                _yield$file = _context.sent;
                createReadStream = _yield$file.createReadStream;
                filename = _yield$file.filename;
                mimetype = _yield$file.mimetype;
                encoding = _yield$file.encoding;
                // Invoking the `createReadStream` will return a Readable Stream.
                // See https://nodejs.org/api/stream.html#stream_readable_streams
                stream = createReadStream();
                paths = "public/".concat(filename); // This is purely for demonstration purposes and will overwrite the
                // local-file-output.txt in the current working directory on EACH upload.

                out = require('fs').createWriteStream(paths);
                stream.pipe(out);
                photo = {
                  filename: filename
                };
                return _context.abrupt("return", photo);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function singleUpload(_x, _x2) {
        return _singleUpload.apply(this, arguments);
      }

      return singleUpload;
    }()
  }
};
module.exports = resolvers;
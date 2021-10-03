"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _upload = _interopRequireDefault(require("./upload.resolver"));

var _user = _interopRequireDefault(require("./user.resolver"));

var _default = [_upload["default"], _user["default"]];
exports["default"] = _default;
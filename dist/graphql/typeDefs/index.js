"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _upload = _interopRequireDefault(require("./upload"));

var _user = _interopRequireDefault(require("./user"));

var _templateObject;

var base = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  extend type Query {\n    _: String!\n  }\n\n  extend type Mutation {\n    _: String!\n  }\n"])));
var typeDefs = [base, _upload["default"], _user["default"]];
var _default = typeDefs;
exports["default"] = _default;
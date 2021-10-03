"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var upload = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  # The implementation for this scalar is provided by the\n  # 'GraphQLUpload' export from the 'graphql-upload' package\n  # in the resolver map below.\n  scalar Upload\n\n  type File {\n    id: ID!\n    url: String!\n    categories: String!\n  }\n\n  type Query {\n    # This is only here to satisfy the requirement that at least one\n    # field be present within the 'Query' type.  This example does not\n    # demonstrate how to fetch uploads back.\n   uploads:[File!]\n  }\n  input uploadInput {\n    image: Upload!\n    categories: String!\n  }\n  type Message {\n    message: String!\n  }\n\n  type Mutation {\n    # Multiple uploads are supported. See graphql-upload docs for details.\n    singleUpload(input: uploadInput!): File!\n    deleteImg(id: ID!): Message!\n  }\n"])));
var _default = upload;
exports["default"] = _default;
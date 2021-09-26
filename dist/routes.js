"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setRoutes;

var _express = _interopRequireDefault(require("express"));

//const {validateRegistrationBody,validateLoginBody,Todovalidate,TodoId, validate} = require('./util/validation');
//import authController from './controllers/auth.controller';
//import galleryController,{upload} from './controllers/gallery.controller';
//import authManager from './util/auth';
function setRoutes(app) {
  var router = _express["default"].Router();
  /*
  router.post("/register", validateRegistrationBody(),validate, authController.register);
  router.post("/login", validateLoginBody(), validate,authController.login);
  router.route('/image').post(authManager.verifyToken,upload.single('image'), galleryController.create);
  router.route('/image/:id').get(authManager.verifyToken,galleryController.getImages);
  router.route('/image/:id').delete(authManager.verifyToken,galleryController.delete);
  */


  app.use('/', router);
}
const Router = require("express").Router();
const userController = require("../../Controller/UserController/userContoller")
const userauthenticate = require("../../middleware/user/userAuthenticate");

Router.post("/register",userController.Register);
Router.post("/login",userController.Login);

Router.post("/logout",userauthenticate,userController.logout)




module.exports = Router;
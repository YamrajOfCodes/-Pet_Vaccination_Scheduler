const Router = require("express").Router();
const petController = require("../../Controller/PetController/PetController");


Router.post("/pets",petController.addPet);
Router.get("/pets",petController.getPets);
Router.put("/pets/:id",petController.updatePet);
Router.delete("/pets/:id",petController.removePet);











module.exports  = Router;
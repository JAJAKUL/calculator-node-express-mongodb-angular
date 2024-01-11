module.exports = app => {
  const getRoutes = require("../controllers/calculator.controller.js");

  var router = require("express").Router();

  // Create a new getRoutes
  router.post("/calculate", getRoutes.create);

  // Retrieve all getRoutes
  router.get("/getall", getRoutes.findAll);

  app.use("/api/calculator", router);
};

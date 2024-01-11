const db = require("../models");
const calculator = db.calculators;

// Create and Save a new calculator
exports.create = (req, res) => {
  // Validate request
  if (!req.body.expression) {
    res.status(400).send({ message: "Expression can not be empty!" });
    return;
  }

  // Create a calculation
  let result = eval(req.body.expression);
      if (Number(result) % 1 != 0)
        result = Number(result).toFixed(2);
        req.body.output = result;
  const calculatoion = new calculator(req.body);

  // Save calculatoion in the database
  calculatoion
    .save(calculatoion)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the calculations."
      });
    });
};

// Retrieve all calculators from the database.
exports.findAll = (req, res) => {
  calculator.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving calculations."
      });
    });
};

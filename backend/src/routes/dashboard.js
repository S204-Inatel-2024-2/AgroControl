const express = require("express");
const dashboardController = require("../controllers/dashboard");
const router = express.Router();

router.get("/salarioFuncionarios", dashboardController.getSalarioFuncionarios);

module.exports = router;
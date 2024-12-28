const express = require("express");
const dashboardController = require("../controllers/dashboard");
const router = express.Router();

router.get("/salarioFuncionarios", dashboardController.getSalarioFuncionarios);
router.get("/analiseFinanceiraMensal", dashboardController.getAnaliseFinanceiraMensal);
router.get("/lucroByReceita", dashboardController.lucroByReceita);
module.exports = router;
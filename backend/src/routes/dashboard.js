const express = require("express");
const dashboardController = require("../controllers/dashboard");
const router = express.Router();

router.get("/totalAPagarSalario", dashboardController.getTotalAPagarSalario);
router.get("/totalAPagarServico", dashboardController.getLucrosEGastos);
// router.get(
//   "/totalAPagarSalarioServico",
//   dashboardController.getTotalAPagarSalarioServico
// );
// router.get("/prejuizoReceita", dashboardController.getPrejuizoReceita);

module.exports = router;

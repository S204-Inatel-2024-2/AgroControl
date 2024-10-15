const express = require('express');
const router = express.Router();
const servicosController = require('../controllers/servicos');

router.get('/', servicosController.getAllServicos);
router.get('/:id', servicosController.getServicoById);
router.post('/', servicosController.createServico);
router.put('/:id', servicosController.updateServico);
router.delete('/:id', servicosController.deleteServico);

module.exports = router;
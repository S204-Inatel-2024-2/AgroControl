const express = require('express');
const router = express.Router();
const servicosController = require('../controllers/servicosController');

router.get('/', servicosController.getAllServicos);
router.get('/:id', servicosController.getServico);
router.post('/', servicosController.createServico);
router.put('/:id', servicosController.updateServico);
router.delete('/:id', servicosController.deleteServico);

module.exports = router;
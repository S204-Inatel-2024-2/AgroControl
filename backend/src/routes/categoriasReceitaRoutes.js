const express = require('express');
const router = express.Router();
const categoriasReceita = require('../controllers/categoriasReceitaController');

router.get('/',categoriasReceita.getAllCategorias)

module.exports = router;
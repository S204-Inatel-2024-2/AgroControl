const CategoriasReceita = require('../services/categoriaReceitaService');
const categoriasReceita = new CategoriasReceita();

class CategoriasReceitaController {
    static async getAllCategorias(req, res) {
        try {
            await categoriasReceita.getAllCategorias(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}
module.exports = CategoriasReceitaController;
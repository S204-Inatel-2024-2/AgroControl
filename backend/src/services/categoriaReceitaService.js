const {Categoria} = require('../db/models')

class CategoriaReceitaService{

    async getAllCategorias(req,res){
        try{
            const categorias = await Categoria.findAll();
            res.status(200).json(categorias)
        }catch(error){
            res.status(500).json({ error: error.message });
        }   
    }

}

module.exports = CategoriaReceitaService;

const CategoriaReceitaService = require('../services/CategoriaReceitaService');
const { Categoria } = require('../db/models'); 

jest.mock('../db/models', () => {
  return {
    Categoria: {
      findAll: jest.fn() 
    }
  };
});

describe('CategoriaReceitaService', () => {
  let categoriaReceitaService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    categoriaReceitaService = new CategoriaReceitaService();
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('deve retornar uma lista de categorias com status 200', async () => {
    const mockCategorias = [
      { id: 1, nome: 'Categoria 1' },
      { id: 2, nome: 'Categoria 2' }
    ];

    Categoria.findAll.mockResolvedValue(mockCategorias); 

    await categoriaReceitaService.getAllCategorias(mockReq, mockRes);

    expect(Categoria.findAll).toHaveBeenCalledTimes(1); 
    expect(mockRes.status).toHaveBeenCalledWith(200); 
    expect(mockRes.json).toHaveBeenCalledWith(mockCategorias); 
  });

  test('deve retornar um erro com status 500 em caso de falha', async () => {
    const mockError = new Error('Erro ao buscar categorias');

    Categoria.findAll.mockRejectedValue(mockError); 

    await categoriaReceitaService.getAllCategorias(mockReq, mockRes);

    expect(Categoria.findAll).toHaveBeenCalledTimes(1); 
    expect(mockRes.status).toHaveBeenCalledWith(500); 
    expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
  });
});

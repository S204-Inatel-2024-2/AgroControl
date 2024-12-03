const { Receita, Categoria } = require("../db/models");
const ReceitaService = require("../services/receitas");

jest.mock("../db/models", () => ({
  Receita: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
  },
  Categoria: {
    findOne: jest.fn(),
  },
}));

describe("ReceitaService", () => {
  let receitaService;
  let req, res;

  beforeEach(() => {
    receitaService = new ReceitaService();
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("createReceita", () => {
    it("deve criar uma receita com sucesso", async () => {
      req.body = {
        lucro: 200,
        valorReceita: 1000,
        observacao: "Venda de produtos",
        idCategoria: 1,
      };

      Categoria.findOne.mockResolvedValueOnce({ id: 1 });
      Receita.create.mockResolvedValueOnce({ id: 1, ...req.body });

      await receitaService.createReceita(req, res);

      expect(Categoria.findOne).toHaveBeenCalledWith({
        where: { id: req.body.idCategoria },
      });
      expect(Receita.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        receita: { id: 1, ...req.body },
        message: "Receita cadastrada com sucesso!",
      });
    });

    it("deve retornar erro se campos obrigatórios estiverem ausentes", async () => {
      req.body = { lucro: 200 };

      await receitaService.createReceita(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Os campos são obrigatórios.",
      });
    });

    it("deve retornar erro se a categoria não for encontrada", async () => {
      req.body = {
        lucro: 200,
        valorReceita: 1000,
        observacao: "Venda de produtos",
        idCategoria: 1,
      };

      Categoria.findOne.mockResolvedValueOnce(null);

      await receitaService.createReceita(req, res);

      expect(Categoria.findOne).toHaveBeenCalledWith({
        where: { id: req.body.idCategoria },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Categoria não Encontrada.",
      });
    });

    it("deve retornar erro 500 em caso de falha no servidor", async () => {
      req.body = {
        lucro: 200,
        valorReceita: 1000,
        observacao: "Venda de produtos",
        idCategoria: 1,
      };

      Categoria.findOne.mockRejectedValueOnce(new Error("Erro no banco"));

      await receitaService.createReceita(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Erro no banco" });
    });
  });

  describe("getReceitaById", () => {
    it("deve retornar uma receita existente", async () => {
      req.params.id = 1;
      Receita.findByPk.mockResolvedValueOnce({ id: 1, lucro: 200 });

      await receitaService.getReceitaById(req, res);

      expect(Receita.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        receita: { id: 1, lucro: 200 },
        message: "Receita encontrada com sucesso!",
      });
    });

    it("deve retornar erro 404 se a receita não for encontrada", async () => {
      req.params.id = 1;
      Receita.findByPk.mockResolvedValueOnce(null);

      await receitaService.getReceitaById(req, res);

      expect(Receita.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Receita não encontrada.",
      });
    });

    it("deve retornar erro 500 em caso de falha no servidor", async () => {
      req.params.id = 1;
      Receita.findByPk.mockRejectedValueOnce(new Error("Erro no banco"));

      await receitaService.getReceitaById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Erro no banco" });
    });
  });

  describe("getAllReceitas", () => {
    it("deve listar todas as receitas formatadas corretamente", async () => {
      Receita.findAll.mockResolvedValueOnce([
        {
          id: 1,
          lucro: 200,
          valorReceita: 1000,
          observacao: "Venda de produtos",
          categoria: { descricao: "Vendas" },
          createdAt: "2024-11-01",
          updatedAt: "2024-11-10",
        },
      ]);

      await receitaService.getAllReceitas(req, res);

      expect(Receita.findAll).toHaveBeenCalledWith({
        include: [
          { model: Categoria, as: "categoria", attributes: ["descricao"] },
        ],
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          id: 1,
          lucro: 200,
          valorReceita: 1000,
          observacao: "Venda de produtos",
          categoria: "Vendas",
          createdAt: "2024-11-01",
          updatedAt: "2024-11-10",
        },
      ]);
    });

    it("deve retornar erro 500 em caso de falha no servidor", async () => {
      Receita.findAll.mockRejectedValueOnce(new Error("Erro no banco"));

      await receitaService.getAllReceitas(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Não foi possivel listar receitas!",
      });
    });

    it("deve retornar categoria como null se a receita não tiver uma categoria associada", async () => {
      Receita.findAll.mockResolvedValueOnce([
        {
          id: 2,
          lucro: 100,
          valorReceita: 500,
          observacao: "Sem categoria",
          categoria: null,
          createdAt: "2024-11-01",
          updatedAt: "2024-11-10",
        },
      ]);

      await receitaService.getAllReceitas(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          id: 2,
          lucro: 100,
          valorReceita: 500,
          observacao: "Sem categoria",
          categoria: null, 
          createdAt: "2024-11-01",
          updatedAt: "2024-11-10",
        },
      ]);
    });
  });

  describe("updateReceita", () => {
    it("deve atualizar uma receita com sucesso", async () => {
      req.params.id = 1;
      req.body = {
        lucro: 300,
        valorReceita: 1200,
        observacao: "Venda de serviços",
        idCategoria: 2,
      };

      const receitaMock = {
        id: 1,
        lucro: 200,
        valorReceita: 1000,
        observacao: "Venda de produtos",
        idCategoria: 1,
        save: jest.fn(),
      };

      Receita.findByPk.mockResolvedValueOnce(receitaMock);

      await receitaService.updateReceita(req, res);

      expect(Receita.findByPk).toHaveBeenCalledWith(1);
      expect(receitaMock.save).toHaveBeenCalled();
      expect(receitaMock.lucro).toBe(300);
      expect(receitaMock.valorReceita).toBe(1200);
      expect(receitaMock.observacao).toBe("Venda de serviços");
      expect(receitaMock.idCategoria).toBe(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        receita: receitaMock,
        message: `Dados atualizados da receita id=1 com sucesso!`,
      });
    });

    it("deve retornar erro 404 se a receita não for encontrada", async () => {
      req.params.id = 1;
      Receita.findByPk.mockResolvedValueOnce(null);

      await receitaService.updateReceita(req, res);

      expect(Receita.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Receita não encontrada.",
      });
    });

    it("deve atualizar apenas os campos fornecidos", async () => {
      req.params.id = 1;
      req.body = {
        lucro: 400,
      };

      const receitaMock = {
        id: 1,
        lucro: 200,
        valorReceita: 1000,
        observacao: "Venda de produtos",
        idCategoria: 1,
        save: jest.fn(),
      };

      Receita.findByPk.mockResolvedValueOnce(receitaMock);

      await receitaService.updateReceita(req, res);

      expect(Receita.findByPk).toHaveBeenCalledWith(1);
      expect(receitaMock.save).toHaveBeenCalled();
      expect(receitaMock.lucro).toBe(400);
      expect(receitaMock.valorReceita).toBe(1000); 
      expect(receitaMock.observacao).toBe("Venda de produtos"); 
      expect(receitaMock.idCategoria).toBe(1); 
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        receita: receitaMock,
        message: `Dados atualizados da receita id=1 com sucesso!`,
      });
    });

    it("deve retornar erro 500 em caso de falha no servidor", async () => {
      req.params.id = 1;
      req.body = {
        lucro: 400,
        valorReceita: 1500,
      };

      Receita.findByPk.mockRejectedValueOnce(new Error("Erro no banco"));

      await receitaService.updateReceita(req, res);

      expect(Receita.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro no banco",
      });
    });

    it("deve manter o valor de lucro inalterado se não for fornecido no corpo da requisição", async () => {
      req.params.id = 1;
      req.body = {
        valorReceita: 1500,
        observacao: "Apenas valorReceita atualizado",
      };

      const receitaMock = {
        id: 1,
        lucro: 300, 
        valorReceita: 1000,
        observacao: "Venda de produtos",
        idCategoria: 1,
        save: jest.fn(),
      };

      Receita.findByPk.mockResolvedValueOnce(receitaMock);

      await receitaService.updateReceita(req, res);

      expect(receitaMock.lucro).toBe(300); 
      expect(receitaMock.valorReceita).toBe(1500); 
      expect(receitaMock.observacao).toBe("Apenas valorReceita atualizado");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        receita: receitaMock,
        message: `Dados atualizados da receita id=1 com sucesso!`,
      });
    });
  });
});

const { TiposServico } = require("../db/models");
const TiposServicoService = require("../services/tiposServico");

jest.mock("../db/models", () => ({
  TiposServico: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe("TiposServicoService", () => {
  let tiposServicoService;
  let req, res;

  beforeEach(() => {
    tiposServicoService = new TiposServicoService();
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("createTipoServico", () => {
    it("deve criar um tipo de serviço com sucesso", async () => {
      req.body = { descricao: "Manutenção" };
      TiposServico.create.mockResolvedValueOnce({ id: 1, descricao: "Manutenção" });

      await tiposServicoService.createTipoServico(req, res);

      expect(TiposServico.create).toHaveBeenCalledWith({ descricao: "Manutenção" });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, descricao: "Manutenção" });
    });

    it("deve retornar erro 400 se a descrição não for fornecida", async () => {
      req.body = {};

      await tiposServicoService.createTipoServico(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Descrição é obrigatória." });
    });

    it("deve retornar erro 500 em caso de falha no servidor", async () => {
      req.body = { descricao: "Manutenção" };
      TiposServico.create.mockRejectedValueOnce(new Error("Erro no banco"));

      await tiposServicoService.createTipoServico(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro no banco" });
    });
  });

  describe("getAllTiposServico", () => {
    it("deve listar todos os tipos de serviço", async () => {
      TiposServico.findAll.mockResolvedValueOnce([{ id: 1, descricao: "Manutenção" }]);

      await tiposServicoService.getAllTiposServico(req, res);

      expect(TiposServico.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, descricao: "Manutenção" }]);
    });

    it("deve retornar erro 500 em caso de falha no servidor", async () => {
      TiposServico.findAll.mockRejectedValueOnce(new Error("Erro no banco"));

      await tiposServicoService.getAllTiposServico(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro no banco" });
    });
  });

  describe("getTipoServicoById", () => {
    it("deve retornar um tipo de serviço existente", async () => {
      req.params.id = 1;
      TiposServico.findByPk.mockResolvedValueOnce({ id: 1, descricao: "Manutenção" });

      await tiposServicoService.getTipoServicoById(req, res);

      expect(TiposServico.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1, descricao: "Manutenção" });
    });

    it("deve retornar erro 404 se o tipo de serviço não for encontrado", async () => {
      req.params.id = 1;
      TiposServico.findByPk.mockResolvedValueOnce(null);

      await tiposServicoService.getTipoServicoById(req, res);

      expect(TiposServico.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Tipo de serviço não encontrado." });
    });

    it("deve retornar erro 500 em caso de falha no servidor", async () => {
      req.params.id = 1;
      TiposServico.findByPk.mockRejectedValueOnce(new Error("Erro no banco"));

      await tiposServicoService.getTipoServicoById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro no banco" });
    });
  });

  describe("updateTipoServico", () => {
    it("deve atualizar um tipo de serviço com sucesso", async () => {
      req.params.id = 1;
      req.body = { descricao: "Reparação" };
      const tipoServicoMock = { id: 1, descricao: "Manutenção", update: jest.fn() };

      TiposServico.findByPk.mockResolvedValueOnce(tipoServicoMock);

      await tiposServicoService.updateTipoServico(req, res);

      expect(TiposServico.findByPk).toHaveBeenCalledWith(1);
      expect(tipoServicoMock.update).toHaveBeenCalledWith({ descricao: "Reparação" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tipoServicoMock);
    });

    it("deve retornar erro 404 se o tipo de serviço não for encontrado", async () => {
      req.params.id = 1;
      TiposServico.findByPk.mockResolvedValueOnce(null);

      await tiposServicoService.updateTipoServico(req, res);

      expect(TiposServico.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Tipo de serviço não encontrado." });
    });

    it("deve retornar erro 400 se a descrição não for fornecida", async () => {
      req.params.id = 1;
      req.body = {};
      const tipoServicoMock = { id: 1, descricao: "Manutenção", update: jest.fn() };

      TiposServico.findByPk.mockResolvedValueOnce(tipoServicoMock);

      await tiposServicoService.updateTipoServico(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Descrição é obrigatória." });
    });

    it("deve retornar erro 500 em caso de falha no servidor", async () => {
      req.params.id = 1;
      req.body = { descricao: "Reparação" };
      TiposServico.findByPk.mockRejectedValueOnce(new Error("Erro no banco"));

      await tiposServicoService.updateTipoServico(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro no banco" });
    });
  });

  describe("deleteTipoServico", () => {
    it("deve excluir um tipo de serviço com sucesso", async () => {
      req.params.id = 1;
      const tipoServicoMock = { id: 1, destroy: jest.fn() };

      TiposServico.findByPk.mockResolvedValueOnce(tipoServicoMock);

      await tiposServicoService.deleteTipoServico(req, res);

      expect(TiposServico.findByPk).toHaveBeenCalledWith(1);
      expect(tipoServicoMock.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it("deve retornar erro 404 se o tipo de serviço não for encontrado", async () => {
      req.params.id = 1;
      TiposServico.findByPk.mockResolvedValueOnce(null);

      await tiposServicoService.deleteTipoServico(req, res);

      expect(TiposServico.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Tipo de serviço não encontrado." });
    });

    it("deve retornar erro 500 em caso de falha no servidor", async () => {
      req.params.id = 1;
      TiposServico.findByPk.mockRejectedValueOnce(new Error("Erro no banco"));

      await tiposServicoService.deleteTipoServico(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro no banco" });
    });
  });
});

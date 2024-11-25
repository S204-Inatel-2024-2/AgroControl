const { Servicos, Funcionarios, TiposServico } = require("../db/models");
const {
  emailServicoFinalizado,
  emailServicoCancelado,
  emailTransferenciaServico,
} = require("../utils/servidorEmail");
const ServicosService = require("../services/servicos");

jest.mock("../db/models", () => ({
  Servicos: { findAll: jest.fn(), findByPk: jest.fn(), create: jest.fn() },
  Funcionarios: { findByPk: jest.fn() },
  TiposServico: { findByPk: jest.fn() },
}));

jest.mock("../utils/servidorEmail", () => ({
  emailServicoFinalizado: jest.fn(),
  emailServicoCancelado: jest.fn(),
  emailTransferenciaServico: jest.fn(),
}));

describe("ServicosService", () => {
  let servicosService;
  let req, res;

  beforeEach(() => {
    servicosService = new ServicosService();
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("createServico", () => {
    it("deve criar um novo serviço se todos os campos forem válidos", async () => {
      req.body = {
        status: "pendente",
        dataAtividade: "2024-01-01",
        tipoServico: 1,
        responsavel: 1,
        valorGasto: 200,
      };

      Funcionarios.findByPk.mockResolvedValueOnce({ id: 1 });
      TiposServico.findByPk.mockResolvedValueOnce({ id: 1 });
      Servicos.create.mockResolvedValueOnce(req.body);

      await servicosService.createServico(req, res);

      expect(Servicos.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("deve retornar erro 400 se algum campo obrigatório estiver ausente", async () => {
      req.body = { status: "pendente" };

      await servicosService.createServico(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Os campos são obrigatórios.",
      });
    });

    it("deve retornar erro 404 se funcionário não for encontrado", async () => {
      req.body = {
        status: "pendente",
        dataAtividade: "2024-01-01",
        tipoServico: 1,
        responsavel: 1,
        valorGasto: 200,
      };

      Funcionarios.findByPk.mockResolvedValueOnce(null);

      await servicosService.createServico(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Funcionário não encontrado.",
      });
    });

    it("deve retornar 404 se o tipo de serviço não for encontrado", async () => {
      req.body = {
        status: "pendente",
        dataAtividade: "2024-01-01",
        tipoServico: 2,
        responsavel: 1,
        valorGasto: 500,
      };

      const funcionarioMock = { id: 1, nome: "João" };

      Funcionarios.findByPk.mockResolvedValueOnce(funcionarioMock); // Funcionário encontrado
      TiposServico.findByPk.mockResolvedValueOnce(null); // Tipo de serviço não encontrado

      await servicosService.createServico(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Tipo de Serviço não encontrado.",
      });
    });

    it("deve retornar 500 em caso de exceção", async () => {
      req.body = {
        status: "pendente",
        dataAtividade: "2024-01-01",
        tipoServico: 2,
        responsavel: 1,
        valorGasto: 500,
      };

      Funcionarios.findByPk.mockRejectedValueOnce(new Error("Erro inesperado"));

      await servicosService.createServico(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro inesperado" });
    });
  });

  describe("getAllServicos", () => {
    it("deve retornar a lista de serviços formatada", async () => {
      Servicos.findAll.mockResolvedValueOnce([
        {
          IdServico: 1,
          status: "pendente",
          dataAtividade: "2024-01-01",
          TiposServico: { descricao: "Consulta" },
          Funcionario: { nome: "João" },
          valorGasto: 100,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      ]);

      await servicosService.getAllServicos(req, res);

      expect(Servicos.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          IdServico: 1,
          status: "pendente",
          dataAtividade: "2024-01-01",
          tipoServico: "Consulta",
          responsavel: "João",
          valorGasto: 100,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      ]);
    });

    it("deve retornar erro 500 em caso de exceção", async () => {
      Servicos.findAll.mockRejectedValueOnce(new Error("Erro inesperado"));

      await servicosService.getAllServicos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro inesperado" });
    });

    it("deve formatar e retornar a lista de serviços corretamente", async () => {
      const servicoMock = [
        {
          IdServico: 1,
          status: "pendente",
          dataAtividade: "2024-01-01",
          TiposServico: { descricao: "Tipo A" },
          Funcionario: { nome: "João" },
          valorGasto: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          IdServico: 2,
          status: "concluido",
          dataAtividade: "2024-01-02",
          TiposServico: null, // Tipo de serviço ausente
          Funcionario: null, // Responsável ausente
          valorGasto: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      Servicos.findAll.mockResolvedValueOnce(servicoMock);

      await servicosService.getAllServicos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          IdServico: 1,
          status: "pendente",
          dataAtividade: "2024-01-01",
          tipoServico: "Tipo A",
          responsavel: "João",
          valorGasto: 500,
          createdAt: servicoMock[0].createdAt,
          updatedAt: servicoMock[0].updatedAt,
        },
        {
          IdServico: 2,
          status: "concluido",
          dataAtividade: "2024-01-02",
          tipoServico: null,
          responsavel: null,
          valorGasto: 300,
          createdAt: servicoMock[1].createdAt,
          updatedAt: servicoMock[1].updatedAt,
        },
      ]);
    });
  });

  describe("getServicoById", () => {
    it("deve retornar o serviço se encontrado", async () => {
      req.params.id = 1;
      Servicos.findByPk.mockResolvedValueOnce({
        IdServico: 1,
        status: "pendente",
      });

      await servicosService.getServicoById(req, res);

      expect(Servicos.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        IdServico: 1,
        status: "pendente",
      });
    });

    it("deve retornar 404 se o serviço não for encontrado", async () => {
      req.params.id = 1;
      Servicos.findByPk.mockResolvedValueOnce(null);

      await servicosService.getServicoById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Serviço não encontrado.",
      });
    });

    it("deve retornar erro 500 em caso de exceção", async () => {
      req.params.id = 1;
      Servicos.findByPk.mockRejectedValueOnce(new Error("Erro inesperado"));

      await servicosService.getServicoById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro inesperado" });
    });
  });

  describe("updateServico", () => {
    it("deve atualizar o serviço com sucesso", async () => {
      req.params.id = 1;
      req.body = {
        status: "concluido",
        dataAtividade: "2024-01-02",
        tipoServico: 2,
        responsavel: 2,
        valorGasto: 300,
      };

      const servicoMock = {
        IdServico: 1,
        status: "pendente",
        responsavel: 1,
        update: jest.fn(),
      };

      const funcionarioAntigo = { id: 1, nome: "João" };
      const funcionarioNovo = {
        id: 2,
        nome: "Maria",
        email: "maria@example.com",
      };
      const tipoServicoMock = { id: 2 };

      Servicos.findByPk.mockResolvedValueOnce(servicoMock);
      Funcionarios.findByPk
        .mockResolvedValueOnce(funcionarioAntigo) // Responsável antigo
        .mockResolvedValueOnce(funcionarioNovo); // Novo responsável
      TiposServico.findByPk.mockResolvedValueOnce(tipoServicoMock);

      await servicosService.updateServico(req, res);

      expect(servicoMock.update).toHaveBeenCalledWith(req.body);
      expect(emailServicoFinalizado).toHaveBeenCalled();
      expect(emailTransferenciaServico).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(servicoMock);
    });

    it("deve retornar 404 se o serviço não for encontrado", async () => {
      req.params.id = 1;
      Servicos.findByPk.mockResolvedValueOnce(null);

      await servicosService.updateServico(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Serviço não encontrado.",
      });
    });

    it("deve retornar 404 se o responsável não for encontrado", async () => {
      req.params.id = 1;
      req.body = { responsavel: 2 };

      Servicos.findByPk.mockResolvedValueOnce({ IdServico: 1 });
      Funcionarios.findByPk.mockResolvedValueOnce(null);

      await servicosService.updateServico(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Funcionário não encontrado.",
      });
    });

    it("deve retornar 404 se o tipo de serviço não for encontrado", async () => {
      req.params.id = 1;
      req.body = { tipoServico: 2 };

      Servicos.findByPk.mockResolvedValueOnce({ IdServico: 1 });
      Funcionarios.findByPk.mockResolvedValueOnce({ id: 1 });
      TiposServico.findByPk.mockResolvedValueOnce(null);

      await servicosService.updateServico(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Tipo de Serviço não encontrado.",
      });
    });

    it("deve retornar 500 em caso de exceção", async () => {
      req.params.id = 1;
      Servicos.findByPk.mockRejectedValueOnce(new Error("Erro inesperado"));

      await servicosService.updateServico(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro inesperado" });
    });

    it("deve enviar um e-mail quando o status do serviço for concluido", async () => {
      req.params.id = 1;
      req.body = {
        status: "concluido",
        dataAtividade: "2024-11-01",
        tipoServico: 1,
        responsavel: 1,
        valorGasto: 100,
      };

      const servicoMock = {
        IdServico: 1,
        status: "concluido",
        dataAtividade: "2024-11-01",
        tipoServico: { id: 1 },
        responsavel: 1,
        valorGasto: 100,
        update: jest.fn(),
      };

      const funcionarioMock = { id: 1, nome: "João" };
      const tipoServicoMock = { id: 1, descricao: "Limpeza" };

      Servicos.findByPk.mockResolvedValueOnce(servicoMock);
      Funcionarios.findByPk.mockResolvedValueOnce(funcionarioMock);
      TiposServico.findByPk.mockResolvedValueOnce(tipoServicoMock);
      Servicos.findAll.mockResolvedValueOnce([servicoMock]);

      await servicosService.updateServico(req, res);

      expect(emailServicoFinalizado).toHaveBeenCalledWith({
        servicos: [servicoMock],
        servico: 1,
        status: "concluido",
        tipoServico: { id: 1 },
        valorGasto: req.body.valorGasto,
        responsavel: funcionarioMock.nome,
        dataAtividade: req.body.dataAtividade,
      });
    });

    it("não deve enviar e-mail se o status não for concluido", async () => {
      const mockServico = {
        IdServico: 1,
        status: "pendente",
        dataAtividade: "2024-11-01",
        tipoServico: 1,
        responsavel: 1,
        valorGasto: 100,
      };
      const mockFuncionario = {
        id: 1,
        nome: "João",
        email: "joao@exemplo.com",
      };
      const mockTipoServico = { id: 1, descricao: "Limpeza" };

      Servicos.findByPk.mockResolvedValue(mockServico);
      Funcionarios.findByPk.mockResolvedValue(mockFuncionario);
      TiposServico.findByPk.mockResolvedValue(mockTipoServico);
      Servicos.findAll.mockResolvedValue([mockServico]);

      const mockRequest = {
        params: { id: 1 },
        body: {
          status: "pendente",
          dataAtividade: "2024-11-01",
          tipoServico: 1,
          responsavel: 1,
          valorGasto: 100,
        },
      };

      await servicosService.updateServico(mockRequest, res);
      expect(emailServicoFinalizado).not.toHaveBeenCalled();
    });

    it("deve atualizar o serviço corretamente sem enviar e-mails quando status não for 'concluido'", async () => {
      req.params.id = 1;
      req.body = {
        status: "pendente", 
        dataAtividade: "2024-11-01",
        tipoServico: 1,
        responsavel: 1,
        valorGasto: 100,
      };

      const servicoMock = {
        IdServico: 1,
        status: "pendente",
        dataAtividade: "2024-11-01",
        tipoServico: 1,
        responsavel: 1,
        valorGasto: 100,
        update: jest.fn(), 
      };

      Servicos.findByPk.mockResolvedValueOnce(servicoMock);
      Funcionarios.findByPk.mockResolvedValueOnce({ id: 1, nome: "João" });
      TiposServico.findByPk.mockResolvedValueOnce({
        id: 1,
        descricao: "Limpeza",
      });

      await servicosService.updateServico(req, res);

      expect(servicoMock.update).toHaveBeenCalledWith(req.body);
      expect(emailServicoFinalizado).not.toHaveBeenCalled(); 
    });
  });

  describe("deleteServico", () => {
    it("deve excluir o serviço com sucesso", async () => {
      req.params.id = 1;

      const servicoMock = {
        IdServico: 1,
        responsavel: 2,
        dataAtividade: "2024-01-01",
        tipoServico: 3,
        valorGasto: 500,
        destroy: jest.fn(),
      };

      const funcionarioMock = { id: 2, nome: "Maria" };

      Servicos.findByPk.mockResolvedValueOnce(servicoMock);
      Funcionarios.findByPk.mockResolvedValueOnce(funcionarioMock);

      await servicosService.deleteServico(req, res);

      expect(emailServicoCancelado).toHaveBeenCalledWith({
        servico: servicoMock.IdServico,
        status: "cancelado",
        dataAtividade: servicoMock.dataAtividade,
        tipoServico: servicoMock.tipoServico,
        responsavel: funcionarioMock.nome,
        valorGasto: servicoMock.valorGasto,
      });
      expect(servicoMock.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it("deve retornar 404 se o serviço não for encontrado", async () => {
      req.params.id = 1;
      Servicos.findByPk.mockResolvedValueOnce(null);

      await servicosService.deleteServico(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Serviço não encontrado.",
      });
    });

    it("deve retornar 404 se o responsável não for encontrado", async () => {
      req.params.id = 1;

      Servicos.findByPk.mockResolvedValueOnce({ IdServico: 1, responsavel: 2 });
      Funcionarios.findByPk.mockResolvedValueOnce(null);

      await servicosService.deleteServico(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Funcionário não encontrado.",
      });
    });

    it("deve retornar 500 em caso de exceção", async () => {
      req.params.id = 1;
      Servicos.findByPk.mockRejectedValueOnce(new Error("Erro inesperado"));

      await servicosService.deleteServico(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro inesperado" });
    });
  });
});

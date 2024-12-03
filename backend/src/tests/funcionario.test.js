const { Funcionarios, Servicos } = require("../db/models");
const {
  emailNovoFuncionario,
  emailFuncionarioRemovido,
} = require("../utils/servidorEmail");
const FuncionarioService = require("../services/funcionario");

jest.mock("../db/models", () => ({
  Funcionarios: {
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
  },
  Servicos: {
    findAll: jest.fn(),
  },
}));

jest.mock("../utils/servidorEmail", () => ({
  emailNovoFuncionario: jest.fn(),
  emailFuncionarioRemovido: jest.fn(),
}));

describe("FuncionarioService", () => {
  let funcionarioService;
  let req, res;

  beforeEach(() => {
    funcionarioService = new FuncionarioService();
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createFuncionario", () => {
    it("deve retornar erro se campos obrigatórios estiverem faltando", async () => {
      req.body = {};

      await funcionarioService.createFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Os campos são obrigatórios.",
      });
    });

    it("deve retornar erro se CPF já estiver cadastrado", async () => {
      req.body = {
        nome: "Teste",
        cpf: "12345678900",
        endereco: "Rua A",
        email: "teste@exemplo.com",
        funcao: "Dev",
        salario: 5000,
        dataNascimento: "2000-01-01",
      };

      // Mock para CPF existente
      Funcionarios.findOne.mockImplementationOnce(async ({ where }) => {
        if (where.cpf === "12345678900") {
          return { cpf: "12345678900" };
        }
        return null;
      });

      await funcionarioService.createFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Este cpf pertence a outro usuário",
      });
    });

    it("deve retornar erro se email já estiver cadastrado", async () => {
      req.body = {
        nome: "Teste",
        cpf: "10345672900",
        endereco: "Rua A",
        email: "teste@email.com",
        funcao: "Dev",
        salario: 5000,
        dataNascimento: "2000-01-01",
      };

      // Mock para Email existente
      Funcionarios.findOne
        .mockResolvedValueOnce(null) // Simula que o CPF não existe
        .mockResolvedValueOnce({ email: "teste@email.com" }); // Simula que o e-mail existe

      await funcionarioService.createFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Este email pertence a outro usuário",
      });
    });

    it("deve cadastrar um novo funcionário se todos os dados forem válidos", async () => {
      req.body = {
        nome: "Funcionario teste",
        cpf: "19392392380",
        endereco: "Rua A",
        email: "funcionarioteste@exemplo.com",
        funcao: "Dev",
        salario: 5000,
        dataNascimento: "2000-01-01",
      };

      // Mock das funções do modelo
      Funcionarios.findOne
        .mockResolvedValueOnce(null) // CPF não cadastrado
        .mockResolvedValueOnce(null); // Email não cadastrado
      Funcionarios.create.mockResolvedValue(req.body);

      // Mock da função de envio de email
      emailNovoFuncionario.mockResolvedValue(true);

      await funcionarioService.createFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        funcionario: req.body,
        message: "Funcionário cadastrado com sucesso!",
      });
      expect(emailNovoFuncionario).toHaveBeenCalledWith(req.body);
    });

    it("deve retornar erro se falhar ao enviar e-mail após a criação do funcionário", async () => {
      req.body = {
        nome: "Funcionario teste",
        cpf: "19392392380",
        endereco: "Rua A",
        email: "funcionarioteste@exemplo.com",
        funcao: "Dev",
        salario: 5000,
        dataNascimento: "2000-01-01",
      };

      // Mock das funções do modelo
      Funcionarios.findOne
        .mockResolvedValueOnce(null) // CPF não cadastrado
        .mockResolvedValueOnce(null); // Email não cadastrado
      Funcionarios.create.mockResolvedValue(req.body);

      // Mock para falhar ao enviar o e-mail
      emailNovoFuncionario.mockRejectedValue(new Error("Erro no envio"));

      await funcionarioService.createFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro no envio",
      });
    });
  });

  describe("getFuncionarioById", () => {
    it("deve retornar erro se funcionário não for encontrado", async () => {
      req.params.id = 1;
      Funcionarios.findByPk.mockResolvedValueOnce(null); // Funcionário inexistente

      await funcionarioService.getFuncionarioById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Funcionário não encontrado.",
      });
    });

    it("deve retornar dados do funcionário se ele for encontrado", async () => {
      req.params.id = 1;
      const funcionario = { id: 1, nome: "Teste" };
      Funcionarios.findByPk.mockResolvedValueOnce(funcionario);

      await funcionarioService.getFuncionarioById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        funcionario,
        message: "Funcionário encontrado com sucesso!",
      });
    });

    it("deve retornar erro se ocorrer um erro interno ao buscar o funcionário", async () => {
      req.params.id = 1;
      // Simula um erro interno ao buscar o funcionário no BD
      Funcionarios.findByPk.mockRejectedValueOnce(
        new Error("Erro interno ao buscar o funcionário")
      );

      await funcionarioService.getFuncionarioById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro interno ao buscar o funcionário",
      });
    });
  });

  describe("getAllFuncionarios", () => {
    it("deve retornar uma lista de funcionários", async () => {
      const funcionarios = [
        { id: 1, nome: "Teste" },
        { id: 2, nome: "Outro" },
      ];
      Funcionarios.findAll.mockResolvedValueOnce(funcionarios);

      await funcionarioService.getAllFuncionarios(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(funcionarios);
    });

    it("deve retornar erro se ocorrer um erro ao listar os funcionários", async () => {
      // Simula um erro interno do BD ao listar os funcionarios
      Funcionarios.findAll.mockRejectedValueOnce(
        new Error("Erro interno ao listar")
      );

      await funcionarioService.getAllFuncionarios(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Não foi possivel listar funcionários!",
      });
    });
  });

  describe("getServicosByFuncionario", () => {
    it("deve retornar erro se não houver serviços para o funcionário", async () => {
      req.params.id = 1;
      Servicos.findAll.mockResolvedValueOnce([]); // Sem serviços

      await funcionarioService.getServicosByFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Nenhum serviço encontrado para este funcionário.",
      });
    });

    it("deve retornar lista de serviços se encontrados", async () => {
      req.params.id = 1;
      const servicos = [
        { id: 1, nome: "Serviço A" },
        { id: 2, nome: "Serviço B" },
      ];
      Servicos.findAll.mockResolvedValueOnce(servicos);

      await funcionarioService.getServicosByFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(servicos);
    });

    it("deve retornar erro se ocorrer um erro ao buscar os serviços", async () => {
      req.params.id = 1;

      // Simula um erro interno ao buscar os serviços
      Servicos.findAll.mockRejectedValueOnce(
        new Error("Erro ao acessar os serviços")
      );

      await funcionarioService.getServicosByFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao acessar os serviços",
      });
    });
  });

  describe("updateFuncionario", () => {
    it("deve retornar erro se o funcionário não for encontrado para atualizar", async () => {
      req.params.id = 1;
      Funcionarios.findByPk.mockResolvedValueOnce(null); // Funcionário inexistente

      await funcionarioService.updateFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Funcionário não encontrado.",
      });
    });

    it("deve atualizar o funcionário se encontrado", async () => {
      req.params.id = 1;
      const funcionario = { id: 1, nome: "Teste", save: jest.fn() };
      Funcionarios.findByPk.mockResolvedValueOnce(funcionario);

      req.body = { nome: "Novo Nome" };

      await funcionarioService.updateFuncionario(req, res);

      expect(funcionario.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        funcionario,
        message: "Dados atualizados do funcionario id=1 com sucesso!",
      });
    });

    it("deve retornar erro se falhar ao salvar o funcionário", async () => {
      req.params.id = 1;
      const funcionario = { id: 1, nome: "Teste", save: jest.fn() };
      Funcionarios.findByPk.mockResolvedValueOnce(funcionario);

      req.body = { nome: "Novo Nome" };

      // Mock para falha ao salvar
      funcionario.save.mockRejectedValue(new Error("Erro ao salvar"));

      await funcionarioService.updateFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao salvar",
      });
    });
    it("deve atualizar o nome do funcionário se o nome for fornecido", async () => {
      req.params.id = 1;
      const funcionario = { id: 1, nome: "Antigo Nome", save: jest.fn() };
      Funcionarios.findByPk.mockResolvedValueOnce(funcionario);

      req.body = { nome: "Novo Nome" };

      await funcionarioService.updateFuncionario(req, res);

      // Verifica se o nome foi atualizado
      expect(funcionario.nome).toBe("Novo Nome");
      expect(funcionario.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        funcionario,
        message: "Dados atualizados do funcionario id=1 com sucesso!",
      });
    });

    it("deve manter o nome do funcionário se o nome não for fornecido", async () => {
      req.params.id = 1;
      const funcionario = { id: 1, nome: "Antigo Nome", save: jest.fn() };
      Funcionarios.findByPk.mockResolvedValueOnce(funcionario);

      req.body = {}; // Nenhum nome fornecido

      await funcionarioService.updateFuncionario(req, res);

      // Verifica se o nome não foi alterado
      expect(funcionario.nome).toBe("Antigo Nome");
      expect(funcionario.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        funcionario,
        message: "Dados atualizados do funcionario id=1 com sucesso!",
      });
    });
  });

  describe("deleteFuncionario", () => {
    it("deve retornar erro se o funcionário não for encontrado para deletar", async () => {
      req.params.id = 1;
      Funcionarios.findByPk.mockResolvedValueOnce(null); // Funcionário inexistente

      await funcionarioService.deleteFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Funcionário não encontrado.",
      });
    });

    it("deve deletar o funcionário se ele existir", async () => {
      req.params.id = 1;
      const funcionario = { id: 1, destroy: jest.fn() };
      Funcionarios.findByPk.mockResolvedValueOnce(funcionario);

      await funcionarioService.deleteFuncionario(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(funcionario.destroy).toHaveBeenCalled();
    });
  });

  it("deve retornar erro se falhar ao enviar e-mail após a remoção", async () => {
    req.params.id = 1;
    const funcionario = { id: 1, nome: "Funcionario", destroy: jest.fn() };
    Funcionarios.findByPk.mockResolvedValueOnce(funcionario);

    // Mock para falhar ao enviar o e-mail
    emailFuncionarioRemovido.mockRejectedValue(new Error("Erro no envio"));

    await funcionarioService.deleteFuncionario(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Erro no envio",
    });
  });
});

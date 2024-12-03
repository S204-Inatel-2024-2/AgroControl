const ReceitasService = require("../services/receitasService");
const { Receita } = require("../db/models");

jest.mock("../db/models", () => {
  return {
    Receita: {
      create: jest.fn(),
      findByPk: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
    },
  };
});

describe("ReceitasService", () => {
  let receitasService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    receitasService = new ReceitasService();
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve criar uma receita com sucesso e retornar status 201", async () => {
    const mockReceita = {
      lucro: 5000,
      valorReceita: 10000,
      observacao: "nenhuma",
      idCategoria: 1,
    };

    mockReq.body = mockReceita;
    Receita.create.mockResolvedValue(mockReceita);

    await receitasService.createReceita(mockReq, mockRes);

    expect(Receita.create).toHaveBeenCalledWith(mockReceita);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      receita: mockReceita,
      message: "Receita cadastrada com sucesso!",
    });
  });

  test("deve retornar erro 400 se campos obrigatórios estiverem ausentes", async () => {
    mockReq.body = {};

    await receitasService.createReceita(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Os campos são obrigatórios.",
    });
  });

  test("deve retornar erro 500 se ocorrer um erro ao criar a receita", async () => {
    const mockReceita = {
      lucro: 5000,
      valorReceita: 10000,
      observacao: "nenhuma",
      idCategoria: 1,
    };

    mockReq.body = mockReceita;

    const mockError = new Error("Erro ao criar a receita");
    Receita.create.mockRejectedValue(mockError);

    await receitasService.createReceita(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: mockError.message,
    });
  });

  test("deve retornar uma receita com sucesso ao buscar pelo ID", async () => {
    const mockReceita = {
      id: 1,
      lucro: 5000,
      valorReceita: 10000,
      observacao: "nenhuma",
      idCategoria: 1,
    };

    mockReq.params = { id: 1 };
    Receita.findByPk.mockResolvedValue(mockReceita);

    await receitasService.getReceitaById(mockReq, mockRes);

    expect(Receita.findByPk).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      receita: mockReceita,
      message: "Receita encontrada com sucesso!",
    });
  });

  test("deve retornar erro 404 se receita não for encontrada", async () => {
    mockReq.params = { id: 999 };
    Receita.findByPk.mockResolvedValue(null);

    await receitasService.getReceitaById(mockReq, mockRes);

    expect(Receita.findByPk).toHaveBeenCalledWith(999);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Receita não encontrada.",
    });
  });
  test("deve retornar erro 500 se ocorrer um erro ao buscar a receita pelo ID", async () => {
    mockReq.params = { id: 1 };

    const mockError = new Error("Erro ao buscar a receita");
    Receita.findByPk.mockRejectedValue(mockError);

    await receitasService.getReceitaById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: mockError.message,
    });
  });

  test("deve retornar uma lista de receitas com status 200", async () => {
    const mockReceitas = [
      {
        id: 1,
        lucro: 5000,
        valorReceita: 10000,
        observacao: "nenhuma 1",
        idCategoria: 1,
      },
      {
        id: 2,
        lucro: 2000,
        valorReceita: 5000,
        observacao: "nenhuma 2",
        idCategoria: 2,
      },
    ];

    Receita.findAll.mockResolvedValue(mockReceitas);

    await receitasService.getAllReceitas(mockReq, mockRes);

    expect(Receita.findAll).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockReceitas);
  });

  test("deve retornar erro 500 se ocorrer um erro ao listar as receitas", async () => {
    const mockError = new Error("Erro ao listar as receitas");
    Receita.findAll.mockRejectedValue(mockError);

    await receitasService.getAllReceitas(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Não foi possivel listar receitas!",
    });
  });

  test("deve atualizar os dados da receita com sucesso", async () => {
    const mockReceita = {
      id: 1,
      lucro: 5000,
      valorReceita: 10000,
      observacao: "nenhuma",
      idCategoria: 1,
      save: jest.fn().mockResolvedValue(),
    };

    mockReq.params = { id: 1 };
    mockReq.body = { lucro: 6000, valorReceita: 12000 };

    Receita.findByPk.mockResolvedValue(mockReceita);

    await receitasService.updateReceita(mockReq, mockRes);

    expect(Receita.findByPk).toHaveBeenCalledWith(1);
    expect(mockReceita.save).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      receita: { ...mockReceita, lucro: 6000, valorReceita: 12000 },
      message: "Dados atualizados da receita id=1 com sucesso!",
    });
  });

  test("deve manter os valores antigos quando não houver valores para atualização", async () => {
    const mockReceita = {
      id: 1,
      lucro: 5000,
      valorReceita: 10000,
      observacao: "nenhuma",
      idCategoria: 1,
      save: jest.fn().mockResolvedValue(),
    };

    mockReq.params = { id: 1 };
    mockReq.body = { lucro: undefined, valorReceita: null };

    Receita.findByPk.mockResolvedValue(mockReceita);

    await receitasService.updateReceita(mockReq, mockRes);

    expect(mockReceita.lucro).toBe(5000); 
    expect(mockReceita.valorReceita).toBe(10000); 
    expect(mockReceita.save).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      receita: mockReceita,
      message: `Dados atualizados da receita id=1 com sucesso!`,
    });
  });

  test("deve retornar erro 404 se receita não for encontrada para atualização", async () => {
    mockReq.params = { id: 999 };
    mockReq.body = { lucro: 6000, valorReceita: 12000 };
    Receita.findByPk.mockResolvedValue(null);

    await receitasService.updateReceita(mockReq, mockRes);

    expect(Receita.findByPk).toHaveBeenCalledWith(999);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Receita não encontrada.",
    });
  });

  test("deve retornar erro 500 ao ocorrer um erro durante a atualização da receita", async () => {
    const mockError = new Error("Erro inesperado ao atualizar a receita");
    const mockReceita = {
      id: 1,
      lucro: 5000,
      valorReceita: 10000,
      observacao: "nenhuma",
      idCategoria: 1,
      save: jest.fn().mockRejectedValue(mockError),
    };

    mockReq.params = { id: 1 };
    mockReq.body = { lucro: 6000, valorReceita: 12000 };

    Receita.findByPk.mockResolvedValue(mockReceita);
    await receitasService.updateReceita(mockReq, mockRes);

    expect(Receita.findByPk).toHaveBeenCalledWith(1);
    expect(mockReceita.save).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

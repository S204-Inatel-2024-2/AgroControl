const { Funcionarios, Servicos } = require("../db/models");
const { emailnovoFuncionario } = require("../utils/servidorEmail");
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
    emailnovoFuncionario: jest.fn(),
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
            req.body = {}; // Campos obrigatórios ausentes

            await funcionarioService.createFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Os campos são obrigatórios.",
            });
        });

        it("deve retornar erro se CPF já estiver cadastrado", async () => {
            req.body = { cpf: "12345678900", email: "teste@exemplo.com", nome: "Teste" };

            // Mock para simular um CPF já cadastrado
            jest.spyOn(Funcionario, 'findOne').mockResolvedValueOnce({ cpf: "12345678900" });

            await funcionarioService.createFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Este cpf pertence a outro usuário"
            });
        })

        it("deve retornar erro se email já estiver cadastrado", async () => {
            req.body = { cpf: "98765432100", email: "teste@exemplo.com", nome: "Teste" };

            // Mock para simular um email já cadastrado
            jest.spyOn(Funcionario, 'findOne')
                .mockResolvedValueOnce(null)  // CPF não cadastrado
                .mockResolvedValueOnce({ email: "teste@exemplo.com" });  // Email cadastrado

            await funcionarioService.createFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Este email pertence a outro usuário"
            });
        });

        it("deve cadastrar um novo funcionário se todos os dados forem válidos", async () => {
            req.body = { cpf: "12312312300", email: "novofuncionario@exemplo.com", nome: "Novo Funcionario" };

            // Mock para simular que nem CPF nem email estão cadastrados
            jest.spyOn(Funcionario, 'findOne').mockResolvedValue(null);

            await funcionarioService.createFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                funcionario: req.body,
                message: "Funcionário cadastrado com sucesso!"
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
    });

    describe("getAllFuncionarios", () => {
        it("deve retornar uma lista de funcionários", async () => {
            const funcionarios = [{ id: 1, nome: "Teste" }, { id: 2, nome: "Outro" }];
            Funcionarios.findAll.mockResolvedValueOnce(funcionarios);

            await funcionarioService.getAllFuncionarios(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(funcionarios);
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
            const servicos = [{ id: 1, nome: "Serviço A" }, { id: 2, nome: "Serviço B" }];
            Servicos.findAll.mockResolvedValueOnce(servicos);

            await funcionarioService.getServicosByFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(servicos);
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
});

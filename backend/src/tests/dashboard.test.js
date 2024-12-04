const DashboardFinanceiroService = require("../services/dashboard");
const { Funcionarios, Servicos, Receita } = require("../db/models");

jest.mock('../db/models', () => ({
    Funcionarios: {
        findAll: jest.fn()
    },
    Servicos: {
        findAll: jest.fn()
    },
    Receita: {
        findAll: jest.fn()
    }
}));

describe("DashboardFinanceiroService", () => {
    let dashboardService;
    let mockReq;
    let mockRes;

    beforeEach(() => {
        dashboardService = new DashboardFinanceiroService();
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("SalarioFuncionarios", () => {
        test("deve retornar o salário, total de serviços e total acumulado de cada funcionário com status 200", async () => {
            const mockFuncionarios = [
                { id: 1, nome: "Jorge", salario: 3000, dataValues: { totalServicos: 2000 }},
                { id: 2, nome: "Marcelo", salario: 2500, dataValues: { totalServicos: 1500 }}
            ];

            Funcionarios.findAll.mockResolvedValue(mockFuncionarios);

            await dashboardService.SalarioFuncionarios(mockReq, mockRes);

            expect(Funcionarios.findAll).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith([
                { id: 1, nome: "Jorge", salario: 3000, totalServicos: 2000, totalSalario: 5000 },
                { id: 2, nome: "Marcelo", salario: 2500, totalServicos: 1500, totalSalario: 4000 }
            ]);
        });

        test("deve retornar status 500 e mensagem de erro em caso de falha", async () => {
            const mockError = new Error("Erro ao buscar dados");

            Funcionarios.findAll.mockRejectedValue(mockError);

            await dashboardService.SalarioFuncionarios(mockReq, mockRes);

            expect(Funcionarios.findAll).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });

        test("deve retornar uma lista vazia se não houver funcionários", async () => { 
            Funcionarios.findAll.mockResolvedValue([]);

            await dashboardService.SalarioFuncionarios(mockReq, mockRes);

            expect(Funcionarios.findAll).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith([]);
        });

        test("deve retornar 0 para totalServicos e totalSalario se funcionário não tiver serviços associados", async () => {
            const mockFuncionarios = [
                { id: 1, nome: "Ana", salario: 2500, dataValues: { totalServicos: null } }
            ];

            Funcionarios.findAll.mockResolvedValue(mockFuncionarios);

            await dashboardService.SalarioFuncionarios(mockReq, mockRes);

            expect(Funcionarios.findAll).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith([
                { id: 1, nome: "Ana", salario: 2500, totalServicos: 0, totalSalario: 2500 }
            ]);
        });

    });

    describe("AnaliseFinanceiraMensal", () => {
        test("deve retornar a análise financeira mensal com status 200", async () => {
            const mockLucro = [
                { dataValues: { month: 1, total_Lucro: "5000.00" } },
                { dataValues: { month: 2, total_Lucro: "3000.00" } }
            ];

            const mockGastos = [
                { dataValues: { month: 1, total_gasto: "2000.00" } },
                { dataValues: { month: 2, total_gasto: "1000.00" } }
            ];

            Receita.findAll.mockResolvedValue(mockLucro);
            Servicos.findAll.mockResolvedValue(mockGastos);

            await dashboardService.AnaliseFinanceiraMensal(mockReq, mockRes);

            expect(Receita.findAll).toHaveBeenCalledTimes(2);
            expect(Servicos.findAll).toHaveBeenCalledTimes(1);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith([
                { month: 1, totalLucroReceita: 5000, totalGasto: 2000 },
                { month: 2, totalLucroReceita: 3000, totalGasto: 1000 },
                { month: 3, totalLucroReceita: 0, totalGasto: 0 },
                { month: 4, totalLucroReceita: 0, totalGasto: 0 },
                { month: 5, totalLucroReceita: 0, totalGasto: 0 },
                { month: 6, totalLucroReceita: 0, totalGasto: 0 },
                { month: 7, totalLucroReceita: 0, totalGasto: 0 },
                { month: 8, totalLucroReceita: 0, totalGasto: 0 },
                { month: 9, totalLucroReceita: 0, totalGasto: 0 },
                { month: 10, totalLucroReceita: 0, totalGasto: 0 },
                { month: 11, totalLucroReceita: 0, totalGasto: 0 },
                { month: 12, totalLucroReceita: 0, totalGasto: 0 }
            ]);
        });

        test("deve retornar status 500 e mensagem de erro em caso de falha ao buscar receitas", async () => {
            const mockError = new Error("Erro ao buscar receitas");
            
            Receita.findAll.mockRejectedValue(mockError);

            await dashboardService.AnaliseFinanceiraMensal(mockReq, mockRes);

            expect(Receita.findAll).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });

        test("deve retornar status 500 e mensagem de erro em caso de falha ao buscar serviços", async () => {
            const mockLucro = [
                { dataValues: { month: 1, total_Lucro: "5000.00" } }
            ];
            const mockError = new Error("Erro ao buscar serviços");
            
            Receita.findAll.mockResolvedValue(mockLucro);
            Servicos.findAll.mockRejectedValue(mockError);

            await dashboardService.AnaliseFinanceiraMensal(mockReq, mockRes);

            expect(Receita.findAll).toHaveBeenCalledTimes(2);
            expect(Servicos.findAll).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: "Erro ao buscar serviços" });
        });

        test("deve retornar valores zerados para meses se receitas estiverem vazias", async () => { 
            Receita.findAll.mockResolvedValue([]);
            Servicos.findAll.mockResolvedValue([]);

            await dashboardService.AnaliseFinanceiraMensal(mockReq, mockRes);

            expect(Receita.findAll).toHaveBeenCalledTimes(2);
            expect(Servicos.findAll).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(Array.from({ length: 12 }, (_, index) => ({ 
                month: index + 1,
                totalLucroReceita: 0,
                totalGasto: 0
            })));
        });

        test("deve preencher meses faltantes com valores zerados", async () => {
            const mockLucro = [{ dataValues: { month: 1, total_Lucro: "5000.00" } }];
            const mockGastos = [{ dataValues: { month: 2, total_gasto: "1000.00" } }];

            Receita.findAll.mockResolvedValue(mockLucro);
            Servicos.findAll.mockResolvedValue(mockGastos);

            await dashboardService.AnaliseFinanceiraMensal(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith([
                { month: 1, totalLucroReceita: 5000, totalGasto: 0 },
                { month: 2, totalLucroReceita: 0, totalGasto: 1000 },
                { month: 3, totalLucroReceita: 0, totalGasto: 0 },
                { month: 4, totalLucroReceita: 0, totalGasto: 0 },
                { month: 5, totalLucroReceita: 0, totalGasto: 0 },
                { month: 6, totalLucroReceita: 0, totalGasto: 0 },
                { month: 7, totalLucroReceita: 0, totalGasto: 0 },
                { month: 8, totalLucroReceita: 0, totalGasto: 0 },
                { month: 9, totalLucroReceita: 0, totalGasto: 0 },
                { month: 10, totalLucroReceita: 0, totalGasto: 0 },
                { month: 11, totalLucroReceita: 0, totalGasto: 0 },
                { month: 12, totalLucroReceita: 0, totalGasto: 0 }
            ]);
        });

        test("deve lidar com arrays vazios para receitas e serviços", async () => {
            Receita.findAll.mockResolvedValue([]);
            Servicos.findAll.mockResolvedValue([]);

            await dashboardService.AnaliseFinanceiraMensal(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith([
                { month: 1, totalLucroReceita: 0, totalGasto: 0 },
                { month: 2, totalLucroReceita: 0, totalGasto: 0 },
                { month: 3, totalLucroReceita: 0, totalGasto: 0 },
                { month: 4, totalLucroReceita: 0, totalGasto: 0 },
                { month: 5, totalLucroReceita: 0, totalGasto: 0 },
                { month: 6, totalLucroReceita: 0, totalGasto: 0 },
                { month: 7, totalLucroReceita: 0, totalGasto: 0 },
                { month: 8, totalLucroReceita: 0, totalGasto: 0 },
                { month: 9, totalLucroReceita: 0, totalGasto: 0 },
                { month: 10, totalLucroReceita: 0, totalGasto: 0 },
                { month: 11, totalLucroReceita: 0, totalGasto: 0 },
                { month: 12, totalLucroReceita: 0, totalGasto: 0 }
            ]);
        });

        test("deve lidar com valores nulos ou indefinidos no retorno de receitas e serviços", async () => {
            const mockLucro = [
                { dataValues: { month: 1, total_Lucro: null } },
                { dataValues: { month: 2, total_Lucro: undefined } }
            ];
            const mockGastos = [
                { dataValues: { month: 1, total_gasto: null } },
                { dataValues: { month: 2, total_gasto: undefined } }
            ];

            Receita.findAll.mockResolvedValue(mockLucro);
            Servicos.findAll.mockResolvedValue(mockGastos);

            await dashboardService.AnaliseFinanceiraMensal(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith([
                { month: 1, totalLucroReceita: 0, totalGasto: 0 },
                { month: 2, totalLucroReceita: 0, totalGasto: 0 },
                { month: 3, totalLucroReceita: 0, totalGasto: 0 },
                { month: 4, totalLucroReceita: 0, totalGasto: 0 },
                { month: 5, totalLucroReceita: 0, totalGasto: 0 },
                { month: 6, totalLucroReceita: 0, totalGasto: 0 },
                { month: 7, totalLucroReceita: 0, totalGasto: 0 },
                { month: 8, totalLucroReceita: 0, totalGasto: 0 },
                { month: 9, totalLucroReceita: 0, totalGasto: 0 },
                { month: 10, totalLucroReceita: 0, totalGasto: 0 },
                { month: 11, totalLucroReceita: 0, totalGasto: 0 },
                { month: 12, totalLucroReceita: 0, totalGasto: 0 }
            ]);
        });
    });
});

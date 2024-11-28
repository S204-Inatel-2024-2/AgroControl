const DashBoardService = require('../services/dashboard')
const dashboardService = new DashBoardService();
class dashBoardController {
    static async getSalarioFuncionarios(req, res) {
        try {
            await dashboardService.SalarioFuncionarios(req, res);
        } catch (error) {
            return res.status(400).json({
                error: error
            });
        }

    }
}
module.exports = dashBoardController;
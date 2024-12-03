const LoginService = require('../services/login')
const loginService = new LoginService();
class LoginController {

    static async validateLogin(req, res) {
        try {
            await loginService.login(req, res);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}



module.exports = LoginController;
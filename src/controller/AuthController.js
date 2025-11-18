const Auth = require("../service/Auth");
const { registerService, loginService } = require("../service/Auth");

class AuthController {

    registerController = async (req, res) => {
        try {
            const result = await Auth.registerService(req.body);
            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                user: result.data || null
            });
        } catch (error) {
            console.error("Register error:", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }

    loginController = async (req, res) => {
        try {
            const result = await Auth.loginService(req.body)
            res.cookie("token", result.token,
                {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 24 * 60 * 60 * 1000
                }
            )
            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                user: result.user
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = new AuthController()
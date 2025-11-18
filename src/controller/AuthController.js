const { registerService } = require("../service/Auth");

exports.registerController = async (req, res) => {
    try {
        const result = await registerService(req.body);
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
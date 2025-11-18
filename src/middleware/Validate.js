import { ZodError,z } from "zod";
export const validateSchema = (schema) => (req, res, next) => {    
  try {
    
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {

      const formatted = error.flatten();  
        
      const firstMessage =
        formatted.fieldErrors &&
        Object.values(formatted.fieldErrors)[0]?.[0];

      return res.status(400).json({
        success: false,
        message: firstMessage || "Validation failed",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

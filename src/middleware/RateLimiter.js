const limit=require('express-rate-limit')
exports.rateLimiter = limit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50,
  standardHeaders: true,    // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,     // Disable X-RateLimit-* headers
  message: {
    status: 429,
    message: "Too many attempts. Please try again after 10 minutes."
  }
});
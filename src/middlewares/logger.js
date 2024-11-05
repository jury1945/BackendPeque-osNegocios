// src/middleware/logger.js
export const logRequest = (req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    console.log('Request params:', req.params);
    console.log('Request query:', req.query);
    next();
  };
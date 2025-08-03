// middleware/auth.js
const dotenv = require('dotenv');
dotenv.config();

const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Authentication failed. Please provide a valid API key.' });
  }
};

module.exports = { authenticate };
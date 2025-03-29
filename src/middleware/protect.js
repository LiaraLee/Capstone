const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Attach the user information to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;

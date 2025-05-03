import jwt from 'jsonwebtoken';

// Middleware to check authentication
const authenticate = (req, res, next) => {
  const token = req.cookies.token; 
  console.log('Token:', token); // Log the token for debugging

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        console.error('Token verification error:', err); // Log the error for debugging
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log('Decoded token:', decoded); // Log the decoded token for debugging
    req.user = decoded; 
    next();
  });
};

export { authenticate };

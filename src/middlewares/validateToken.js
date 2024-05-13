import jwt from 'jsonwebtoken';
import { TOKEN_SCRET } from '../config.js';
export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'no token, autorizacion denegada' });
  }

  jwt.verify(token, TOKEN_SCRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'invalid token' });

    req.user = decoded;

    next();
  });
};

import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
  const logger = require("./app/utility/logger");
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      logger.log('warning','a try without token');
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, "abc");
      req.user = decoded;
    } catch (err) {
      logger.log('warning','a try with Invalid token');
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
  module.exports={
    verifyToken
}

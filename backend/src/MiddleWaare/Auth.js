import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // ✅ Get token from cookies

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized - No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;

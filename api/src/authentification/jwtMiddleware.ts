import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = "your-secret-key";

export const generateToken = (user: any) => {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

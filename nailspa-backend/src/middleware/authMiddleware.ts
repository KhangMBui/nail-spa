import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  jwt.verify(token, SECRET, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ error: "Invalid token" });
      return;
    }
    // @ts-ignore
    req.user = user; // Attach user info to request
    next();
  });
};

export const authorizeRole =
  (role: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    // @ts-ignore
    console.log("Role: ", req.user?.role);
    // @ts-ignore
    if (req.user?.role !== role) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };

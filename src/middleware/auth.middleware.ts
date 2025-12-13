import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../config/jwt";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      res.status(401).json({ message: "Nenhum token, autorização negada" });
      return;
    }

    // Extrair o token do cabeçalho
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Nenhum token, autorização negada" });
    }

    const decoded = verificarToken(token);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Token Inválido");
  }
};

export default authMiddleware;

import jwt, { JwtPayload, Secret } from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("Environment variable JWT_SECRET is not defined");
}
const secretKey: Secret = process.env.JWT_SECRET;
const expiresIn = "10h";

export const gerarToken = (payload: object): string => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verificarToken = (token: string): object | JwtPayload => {
  try {
    return jwt.verify(token, secretKey) as object;
  } catch (error) {
    console.error("Token Invalido:", error);
    return {};
  }
};

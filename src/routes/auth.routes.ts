import { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoutes {
  router = Router();
  controller = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * @swagger
     * /auth/registrar:
     *   post:
     *     summary: Registra um novo usuário
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - nome
     *               - email
     *               - senha
     *             properties:
     *               nome:
     *                 type: string
     *               email:
     *                 type: string
     *               senha:
     *                 type: string
     *               icon:
     *                 type: string
     *                 description: URL do ícone do usuário
     *     responses:
     *       201:
     *         description: Usuário registrado com sucesso
     *       400:
     *         description: Email já está em uso
     *       500:
     *         description: Erro no servidor
     */
    this.router.post("/registrar", this.controller.Registrar);

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Realiza o login de um usuário
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - senha
     *             properties:
     *               email:
     *                 type: string
     *               senha:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login realizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                 usuario:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     nome:
     *                       type: string
     *                     email:
     *                       type: string
     *                     icon:
     *                       type: string
     *       401:
     *         description: Credenciais inválidas
     *       500:
     *         description: Erro no servidor
     */
    this.router.post("/login", this.controller.Login);
  }
}

export default new AuthRoutes().router;

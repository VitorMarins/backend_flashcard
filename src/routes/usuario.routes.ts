import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";
import authMiddleware from "../middleware/auth.middleware";

class UsuarioRoutes {
  router = Router();
  controller = new UsuarioController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * @swagger
     * /usuarios:
     *   get:
     *     summary: Retorna todos os usuários
     *     security:
     *       - bearerAuth: []
     *     tags: [Usuários]
     *     responses:
     *       200:
     *         description: Lista de usuários
     */
    this.router.get("/", authMiddleware, this.controller.GetUsuarios);

    /**
     * @swagger
     * /usuarios/{id}:
     *   get:
     *     summary: Retorna um usuário pelo ID
     *     security:
     *       - bearerAuth: []
     *     tags: [Usuários]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Usuário encontrado
     *       404:
     *         description: Usuário não encontrado
     */
    this.router.get("/:id", authMiddleware, this.controller.GetUsuarioByID);

    /**
     * @swagger
     * /usuarios/{id}:
     *   put:
     *     summary: Atualiza um usuário pelo ID
     *     security:
     *       - bearerAuth: []
     *     tags: [Usuários]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       200:
     *         description: Usuário atualizado
     */
    this.router.put("/:id", authMiddleware, this.controller.UpdateUsuario);

    /**
     * @swagger
     * /usuarios/{id}:
     *   delete:
     *     summary: Deleta um usuário pelo ID
     *     security:
     *       - bearerAuth: []
     *     tags: [Usuários]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Usuário deletado
     */
    this.router.delete("/:id", authMiddleware, this.controller.DeleteUsuario);
  }
}

export default new UsuarioRoutes().router;

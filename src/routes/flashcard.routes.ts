import { Router } from "express";
import FlashcardController from "../controllers/flashcard.controller";
import authMiddleware from "../middleware/auth.middleware";

class FlashcardRoutes {
  router = Router();
  controller = new FlashcardController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * @swagger
     * /flashcards:
     *   get:
     *     summary: Lista todos os flashcards
     *     tags:
     *       - Flashcards
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de flashcards
     */
    this.router.get("/", authMiddleware, this.controller.getFlashcards);

    /**
     * @swagger
     * /flashcards/{id}:
     *   get:
     *     summary: Busca um flashcard pelo ID
     *     tags:
     *       - Flashcards
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do flashcard
     *     responses:
     *       200:
     *         description: Flashcard encontrado
     *       404:
     *         description: Flashcard não encontrado
     */
    this.router.get("/:id", authMiddleware, this.controller.getFlashcardByID);

    /**
     * @swagger
     * /flashcards/usuario/{id}:
     *   get:
     *     summary: Lista flashcards de um usuário
     *     tags:
     *       - Flashcards
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do usuário
     *     responses:
     *       200:
     *         description: Lista de Flashcards
     *       404:
     *         description: Nenhum Flashcard encontrado
     */
    this.router.get(
      "/usuario/:id",
      authMiddleware,
      this.controller.getFlashcardsByUser,
    );

    /**
     * @swagger
     * /flashcards:
     *   post:
     *     summary: Cria um novo Flashcard
     *     tags:
     *       - Flashcards
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - nome
     *               - conteudo
     *               - autor
     *             properties:
     *               nome:
     *                 type: string
     *               conteudo:
     *                 type: string
     *               imagem:
     *                type: string
     *               autor:
     *                 type: string
     *     responses:
     *       201:
     *         description: Flashcard criado com sucesso
     */
    this.router.post("/", authMiddleware, this.controller.createFlashCard);

    /**
     * @swagger
     * /flashcards/{id}:
     *   put:
     *     summary: Atualiza um Flashcard existente
     *     tags:
     *       - Flashcards
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do flashcard
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *               conteudo:
     *                 type: string
     *               imagem:
     *                type: string
     *               autor:
     *                 type: string
     *     responses:
     *       200:
     *         description: Flashcard atualizado com sucesso
     */
    this.router.put("/:id", authMiddleware, this.controller.updateFlashcard);

    /**
     * @swagger
     * /flashcards/{id}:
     *   delete:
     *     summary: Deleta um flashcard pelo ID
     *     tags:
     *       - Flashcards
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do flashcard
     *     responses:
     *       204:
     *         description: Flashcard deletado com sucesso
     */
    this.router.delete("/:id", authMiddleware, this.controller.deleteFlashcard);
  }
}

export default new FlashcardRoutes().router;

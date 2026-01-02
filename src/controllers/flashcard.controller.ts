import { Request, Response } from "express";
import { Flashcard } from "./../models/flashcard.model";

export default class FlashcardController {
  // GET: Listar todos
  async getFlashcards(req: Request, res: Response) {
    try {
      const flashcards = await Flashcard.find();
      return res.status(200).json(flashcards);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar flashcards." });
    }
  }

  // GET: Buscar por ID do Flashcard
  async getFlashcardByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const flashcard = await Flashcard.findById(id);

      if (!flashcard) {
        return res.status(404).json({ message: "Flashcard não encontrado." });
      }

      return res.status(200).json(flashcard);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar o flashcard." });
    }
  }

  // GET: Buscar Flashcards de um usuário específico
  async getFlashcardsByUser(req: Request, res: Response) {
    try {
      const flashcards = await Flashcard.find({
        autor: req.params.id,
      }).populate("autor");
      if (!flashcards || flashcards.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum Flashcard encontrado para este usuário." });
      }
      return res.status(200).json(flashcards);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao buscar flashcards do usuário." });
    }
  }

  // POST: Criar Flashcard
  async createFlashCard(req: Request, res: Response) {
    try {
      const { nome, conteudo, imagem, autor } = req.body;
      if (!nome || !conteudo || !autor) {
        return res
          .status(400)
          .json({ message: "Campos obrigatórios faltando." });
      }
      const flashcard = new Flashcard({
        nome,
        conteudo,
        imagem,
        autor,
      });
      await flashcard.save();
      return res.status(201).json(flashcard);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar flashcard." });
    }
  }

  // PUT: Atualizar Flashcard
  async updateFlashcard(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, conteudo, imagem, autor } = req.body;

      const flashcard = await Flashcard.findByIdAndUpdate(
        id,
        { nome, conteudo, imagem, autor },
        { new: true },
      );
      if (!flashcard) {
        return res
          .status(404)
          .json({ message: "Flashcard não encontrado para atualização." });
      }
      return res.status(200).json(flashcard);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar flashcard." });
    }
  }

  // DELETE: Deletar Flashcard
  async deleteFlashcard(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const flashcard = await Flashcard.findByIdAndDelete(id);
      if (!flashcard) {
        return res.status(404).json({ message: "Flashcard não encontrado." });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar flashcard." });
    }
  }
}

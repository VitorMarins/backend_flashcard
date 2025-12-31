import { Usuario } from "./../models/usuario.model";
import { Request, Response } from "express";

export default class UsuarioController {
  async GetUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno ao buscar usuários." });
    }
  }

  async GetUsuarioByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno ao buscar usuário." });
    }
  }

  async UpdateUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { nome },
        { new: true },
      );
      if (!usuario) {
        res.status(404).json({ message: "Usuário não encontrado para atualização." });
        return;
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno ao atualizar usuário." });
    }
  }

  async DeleteUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Usuario.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno ao deletar usuário." });
    }
  }
}

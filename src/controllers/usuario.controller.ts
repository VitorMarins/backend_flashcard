import { Usuario } from "./../models/usuario.model";
import { Request, Response } from "express";

export default class UsuarioController {
  async GetUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
    }
  }

  async GetUsuarioByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findById(id);
      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
    }
  }

  async UpdateUsuario(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { nome },
        { new: true },
      );
      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
    }
  }

  async DeleteUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Usuario.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
    }
  }
}

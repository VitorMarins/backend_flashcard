import { Application } from "express";
import AuthRoutes from "./auth.routes";
import UsuarioRoutes from "./usuario.routes";
import FlashcardRoutes from "./flashcard.routes";

// Concentrador de rotas
export default class AppRoutes {
  constructor(app: Application) {
    app.use("/usuarios", UsuarioRoutes);
    app.use("/auth", AuthRoutes);
    app.use("/flashcards", FlashcardRoutes);
  }
}

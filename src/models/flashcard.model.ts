import { Schema, model, Document, Types } from "mongoose";
import { IUsuario } from "./usuario.model";

interface IFlashcard extends Document {
  nome: string;
  conteudo: string;
  imagem?: string;
  autor: Types.ObjectId | IUsuario;
}

const FlashcardSchema = new Schema(
  {
    nome: { type: String, required: true, minLength: 3, maxLength: 150 },
    conteudo: { type: String, required: true, maxLength: 250 },
    imagem: { type: String },
    autor: { type: Schema.Types.ObjectId, required: true, ref: "Usuario" },
  },
  { timestamps: true },
);

const Flashcard = model<IFlashcard>("Flashcard", FlashcardSchema);

export { IFlashcard, Flashcard };

import { Schema, model, Document, CallbackError } from "mongoose";
import bcrypt from "bcryptjs";

interface IUsuario extends Document {
  nome: string;
  email: string;
  senha: string;
  icon: string;
  compareSenha(senha: string): Promise<boolean>;
}

const UsuarioSchema: Schema<IUsuario> = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, select: false },
    icon: {
      type: String,
      default: "https://example.com/default-icon.png",
    },
  },
  { timestamps: true },
);

UsuarioSchema.pre<IUsuario>("save", async function () {
  if (!this.isModified("senha")) return;
  try {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
  } catch (err) {
    throw err as CallbackError;
  }
});

UsuarioSchema.methods.compareSenha = function (senha: string) {
  return bcrypt.compare(senha, this.senha);
};

const Usuario = model<IUsuario>("Usuario", UsuarioSchema);

export { IUsuario, Usuario };

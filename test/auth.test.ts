import { describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe("Testes de Autenticação", () => {
  const usuarioTeste = {
    nome: "Fulano 1",
    email: "fulano@gmail.com",
    senha: "teste",
  };

  test("Deve Cadastrar um usuario", async () => {
    const response = await supertest(app.getApptest())
      .post("/auth/registrar")
      .send(usuarioTeste);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: "Usuário registrado com sucesso!",
    });
  });

  test("Não deve cadastrar um usuario com dados de entrada errados", async () => {
    const response = await supertest(app.getApptest())
      .post("/auth/registrar")
      .send({
        email: "Aluno",
        senha: usuarioTeste.senha,
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      message: "Erro no servidor ao registrar usuário",
    });
  });

  test("Não deve cadastrar um usuario ja existente", async () => {
    await supertest(app.getApptest())
      .post("/auth/registrar")
      .send(usuarioTeste);
    const response = await supertest(app.getApptest())
      .post("/auth/registrar")
      .send({
        email: usuarioTeste.email,
        senha: usuarioTeste.senha,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Email já está em uso",
    });
  });

  test("Deve logar um usuario existente", async () => {
    await supertest(app.getApptest())
      .post("/auth/registrar")
      .send(usuarioTeste);
    const response = await supertest(app.getApptest())
      .post("/auth/login")
      .send({
        email: usuarioTeste.email,
        senha: usuarioTeste.senha,
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("token");
  });

  test("Não deve logar com email não cadastrado", async () => {
    const response = await supertest(app.getApptest())
      .post("/auth/login")
      .send({
        email: "email_inexistente@gmail.com",
        senha: "qualquer_senha",
      });
    expect(response.statusCode).toBe(401);
  });
});
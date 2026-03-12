import { describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe("Testes de Usuario", () => {
  const usuarioTeste = {
    nome: "Fulano 1",
    email: "fulano@gmail.com",
    senha: "teste",
  };

  test("Deve cadastrar um usuario", async () => {
    const response = await supertest(app.getApptest())
      .post("/auth/registrar")
      .set("Content-Type", "application/json")
      .send(usuarioTeste);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      message: "Usuário registrado com sucesso!",
    });
  });

  test("Não deve cadastrar um usuario ja existente", async () => {
    await supertest(app.getApptest())
      .post("/auth/registrar")
      .set("Content-Type", "application/json")
      .send(usuarioTeste);
    const response = await supertest(app.getApptest())
      .post("/auth/registrar")
      .set("Content-Type", "application/json")
      .send(usuarioTeste);
    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      message: "Email já está em uso",
    });
  });

  test("Deve encontrar varios usuários", async () => {
    const { nome, ...usuarioSemNome } = usuarioTeste;
    await supertest(app.getApptest())
      .post("/auth/registrar")
      .set("Content-Type", "application/json")
      .send(usuarioTeste);
    const loginResponse = await supertest(app.getApptest())
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send(usuarioSemNome);
    const response = await supertest(app.getApptest())
      .get("/usuarios")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.statusCode).toBe(200);
    const usuarioEncontrado = response.body.some(
      (u: { email: string; nome: string }) =>
        u.email === usuarioTeste.email && u.nome === usuarioTeste.nome,
    );
    expect(usuarioEncontrado).toBe(true);
  });
});

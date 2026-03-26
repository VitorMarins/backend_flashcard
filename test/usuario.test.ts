import { describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe("Testes de Usuario", () => {
  const usuarioTeste = {
    nome: "Fulano 1",
    email: "fulano@gmail.com",
    senha: "teste",
  };
  const usuarioTeste2 = {
    nome: "Fulano 2",
    email: "fulano2@gmail.com",
    senha: "teste2",
  };

  type UsuarioTesteType = typeof usuarioTeste;

  test("CT01 - Deve cadastrar um usuario", async () => {
    const response = await supertest(app.getApptest())
      .post("/auth/registrar")
      .set("Content-Type", "application/json")
      .send(usuarioTeste);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      message: "Usuário registrado com sucesso!",
    });
  });

  test("CT02 - Não deve cadastrar um usuario ja existente", async () => {
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

  test("CT03 - Deve encontrar varios usuários", async () => {
    const { nome, ...usuarioSemNome } = usuarioTeste;
    await supertest(app.getApptest())
      .post("/auth/registrar")
      .set("Content-Type", "application/json")
      .send(usuarioTeste);
    await supertest(app.getApptest())
      .post("/auth/registrar")
      .set("Content-Type", "application/json")
      .send(usuarioTeste2);
    const loginResponse = await supertest(app.getApptest())
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send(usuarioSemNome);
    const response = await supertest(app.getApptest())
      .get("/usuarios")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.statusCode).toBe(200);
    const temFulano1 = response.body.some((u : UsuarioTesteType) => u.email === usuarioTeste.email);
    const temFulano2 = response.body.some((u : UsuarioTesteType) => u.email === usuarioTeste2.email);
    expect(temFulano1).toBe(true);
    expect(temFulano2).toBe(true);
  });
});

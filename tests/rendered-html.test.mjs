import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Colégio Ética institutional page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Conhecimento/);
  assert.match(html, /que/);
  assert.match(html, /conecta\./);
  assert.doesNotMatch(html, /1999/);
  assert.doesNotMatch(html, /book-object/);
  assert.match(html, /Educação Infantil e Ensino Fundamental/);
  assert.match(html, /Colégio Ética São Carlos/);
  assert.match(html, /Galeria das unidades/);
  assert.match(html, /Área do aluno/);
  assert.match(html, /Acessar o CPA/);
  assert.match(html, /class="scroll-progress"/);
  assert.match(html, /class="formation-video"/);
  assert.match(html, /formacao-integral\.mp4/);
  assert.match(html, /As cinco dimensões da formação integral/);
  assert.match(html, /Conheça as etapas de ensino/);
  assert.match(html, /Av\. Dr\. Teixeira de Barros, 779/);
  assert.match(html, /16 99711-7269/);
  assert.match(html, /Av\. José Pereira Lopes, 990/);
  assert.match(html, /16 99761-5482/);
  assert.doesNotMatch(html, /Starter Project|Your site is taking shape/);
});

test("keeps the institutional media required by the page", async () => {
  await Promise.all([
    "public/etica-institucional.png",
    "public/colegio-etica-sao-carlos.png",
    "public/formacao-integral.mp4",
    "public/hero-etica.jpg",
    "public/unidade-infantil.jpg",
    "public/unidade-fundamental.jpg",
    "public/aprender-fazendo.jpg",
    "public/professora-aluna.jpg",
    "public/professor-aluno.jpg",
    "public/alunos-em-movimento.jpg",
  ].map((path) => access(new URL(path, root))));
});

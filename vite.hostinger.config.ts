import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const isStagingBuild = process.env.HOSTINGER_STAGING === "1";
const publicAssetNames = [
  "alunos-em-movimento.jpg",
  "aprender-fazendo.jpg",
  "colegio-etica-sao-carlos-logo.png",
  "formacao-integral.mp4",
  "hero-etica.jpg",
  "professor-aluno.jpg",
  "professora-aluna.jpg",
  "unidade-fundamental.jpg",
  "unidade-infantil.jpg",
];

const publicAssetExpression = new RegExp(
  `(["'])/(${publicAssetNames.join("|")})\\1`,
  "g",
);

export default defineConfig({
  root: resolve(__dirname, "hostinger"),
  publicDir: resolve(__dirname, "public"),
  base: isStagingBuild ? "./" : "/",
  plugins: [
    react(),
    {
      name: "hostinger-staging-relative-public-assets",
      enforce: "pre",
      transform(code, id) {
        if (!isStagingBuild || !id.endsWith("/app/page.tsx")) return null;
        return {
          code: code.replace(publicAssetExpression, "$1./$2$1"),
          map: null,
        };
      },
    },
  ],
  build: {
    outDir: resolve(__dirname, isStagingBuild ? "hostinger-staging-dist" : "hostinger-dist"),
    emptyOutDir: true,
  },
});

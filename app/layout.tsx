import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";
import "./globals.css";

const display = Nunito({ variable: "--font-display", subsets: ["latin"], weight: "variable" });
const sans = Open_Sans({ variable: "--font-sans", subsets: ["latin"], weight: "variable" });
const title = "Colégio Ética São Carlos — Conhecimento que conecta";
const description = "Educação Infantil e Ensino Fundamental em São Carlos, com acolhimento, valores e formação integral.";

export const metadata: Metadata = {
  metadataBase: new URL("https://colegioeticasaocarlos.com.br"),
  title,
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: { title, description, type: "website", url: "/", images: [{ url: "/colegio-etica-sao-carlos.png", width: 1080, height: 1920, alt: "Marca Colégio Ética São Carlos." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/colegio-etica-sao-carlos.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}

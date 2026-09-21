import type { Metadata } from "next";
import { headers } from "next/headers";
import { Nunito, Open_Sans } from "next/font/google";
import "./globals.css";

const display = Nunito({ variable: "--font-display", subsets: ["latin"], weight: "variable" });
const sans = Open_Sans({ variable: "--font-sans", subsets: ["latin"], weight: "variable" });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") || incoming.get("host") || "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Colégio Ética São Carlos — Conhecimento que conecta";
  const description = "Educação Infantil e Ensino Fundamental em São Carlos, com acolhimento, valores e formação integral.";

  return {
    metadataBase: new URL(origin), title, description, icons: { icon: "/favicon.svg" },
    openGraph: { title, description, type: "website", url: origin, images: [{ url: `${origin}/colegio-etica-sao-carlos.png`, width: 1080, height: 1920, alt: "Marca Colégio Ética São Carlos." }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/colegio-etica-sao-carlos.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}

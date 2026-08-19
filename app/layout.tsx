import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") || incoming.get("host") || "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Colégio Ética São Carlos — Conhecimento que conecta";
  const description = "Educação Infantil e Ensino Fundamental com protagonismo, diálogo e formação integral.";

  return {
    metadataBase: new URL(origin), title, description,
    openGraph: { title, description, type: "website", url: origin, images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Colégio Ética — Conhecimento que conecta. Valores que transformam." }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}

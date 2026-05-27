import type { Metadata } from "next";
import { Dancing_Script, Poppins } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://owelign.github.io"),
  title: "15 años Bryanna Aguilar 🌸",
  description:
    "Te invito a celebrar mis 15 años. Sábado 27 de Junio · 5:00 PM",
  openGraph: {
    title: "15 años Bryanna Aguilar 🌸",
    description:
      "Te invito a celebrar mis 15 años. Sábado 27 de Junio · 5:00 PM",
    type: "website",
    images: [
      {
        url: "/bryanna-15/images/Sirenita Fondo.png",
        width: 1200,
        height: 630,
        alt: "15 años Bryanna Aguilar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "15 años Bryanna Aguilar 🌸",
    description:
      "Te invito a celebrar mis 15 años. Sábado 27 de Junio · 5:00 PM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${dancingScript.variable} ${poppins.variable}`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#0B3D4E" />
      </head>
      <body>{children}</body>
    </html>
  );
}

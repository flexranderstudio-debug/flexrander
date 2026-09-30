import { Playfair_Display, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flexrender.dev";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FLEXRANDER Studio | Luxury Digital Design",
    template: "%s | FLEXRANDER Studio",
  },
  description: "FLEXRANDER Studio creates refined digital experiences, premium websites, and bespoke visual systems for ambitious brands.",
  applicationName: "FLEXRANDER Studio",
  keywords: ["FLEXRANDER Studio", "luxury web design", "digital design studio", "premium websites", "UI UX design", "Cairo web design"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "FLEXRANDER Studio",
    title: "FLEXRANDER Studio | Luxury Digital Design",
    description: "Refined digital experiences and bespoke visual systems for ambitious brands.",
    images: [
      {
        url: "/Untitled.png",
        width: 1200,
        height: 630,
        alt: "FLEXRANDER Studio digital design experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FLEXRANDER Studio | Luxury Digital Design",
    description: "Refined digital experiences and bespoke visual systems for ambitious brands.",
    images: ["/Untitled.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${cinzel.variable} ${montserrat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "react-vertical-timeline-component/style.min.css";
import { siteDescription, siteSkills, siteTitle, siteUrl } from "@/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Nabin Thapa",
  },
  description: siteDescription,
  keywords: [
    "Nabin Thapa",
    "Software Engineer Nepal",
    "Web Developer Kathmandu",
    "Portfolio",
    "Frontend Developer",
    "Fullstack Developer",
  ],
  authors: [{ name: "Nabin Thapa", url: siteUrl }],
  creator: "Nabin Thapa",
  publisher: "Nabin Thapa",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Nabin Thapa",
    title: "Nabin Thapa | Software Engineer",
    description:
      "React and TypeScript front-ends, Node.js and Express APIs behind them. See the projects, the stack, and how to get in touch.",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nabin Thapa — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabin Thapa | Software Engineer",
    description:
      "Software engineer in Kathmandu, Nepal. React, TypeScript, Node.js — see my projects and experience.",
    images: ["/og.png"],
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
  icons: {
    icon: "/assets/logo.svg",
    shortcut: "/assets/logo.svg",
    apple: "/assets/logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050816",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nabin Thapa",
  url: siteUrl,
  image: `${siteUrl}/assets/logo.svg`,
  jobTitle: "Software Engineer",
  description: siteDescription,
  knowsAbout: siteSkills,
  worksFor: {
    "@type": "Organization",
    name: "Intuji",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  sameAs: ["https://github.com/nabinthapaa"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <link
          rel="preload"
          href="/desktop_pc/scene.glb"
          as="fetch"
          type="model/gltf-binary"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

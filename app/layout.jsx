import "./globals.css";
import { siteConfig } from "../site.config.js";

export const metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  metadataBase: new URL(siteConfig.meta.baseUrl),
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    type: siteConfig.meta.ogType,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>{children}</body>
    </html>
  );
}

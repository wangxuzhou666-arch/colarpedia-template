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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body>{children}</body>
    </html>
  );
}

"use client";

// Root → canonical article. Client component redirect, so we don't need
// next.config redirects() (which is unsupported under output:'export').
import { useEffect } from "react";
import { siteConfig } from "../site.config.js";

const target = `/wiki/${siteConfig.homepageSlug}/`;

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(target);
  }, []);
  return (
    <div style={{ fontFamily: "Georgia, serif", padding: 24 }}>
      <p>
        Redirecting to <a href={target}>{target}</a>…
      </p>
    </div>
  );
}

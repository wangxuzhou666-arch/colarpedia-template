"use client";

// Client-side search box. Filters a static page list (passed in from
// the server at build time) by title and subtitle. Pressing Enter
// jumps to the top match; clicking a result jumps directly.

import { useEffect, useRef, useState } from "react";

export default function SearchBox({ pages, lang = "en" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const placeholder = lang === "zh" ? "搜索 Colarpedia" : "Search Colarpedia";
  const prefix = lang === "zh" ? "/zh/wiki" : "/wiki";

  const q = query.trim().toLowerCase();
  const matches = q
    ? pages
        .filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
            p.slug.toLowerCase().includes(q),
        )
        .slice(0, 8)
    : [];

  function go(slug) {
    window.location.href = `${prefix}/${slug}/`;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (matches.length > 0) go(matches[0].slug);
  }

  return (
    <form
      ref={wrapRef}
      onSubmit={onSubmit}
      className="wiki-search"
      style={{ position: "relative" }}
      role="search"
    >
      <input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
      />
      {open && matches.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: "none",
            background: "var(--wiki-bg)",
            border: "1px solid var(--wiki-border)",
            borderTop: "none",
            zIndex: 50,
            maxHeight: "320px",
            overflowY: "auto",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          {matches.map((p) => (
            <li key={p.slug}>
              <a
                href={`${prefix}/${p.slug}/`}
                style={{
                  display: "block",
                  padding: "6px 10px",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "var(--wiki-text)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--wiki-border-light)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--wiki-bg-alt)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div style={{ color: "var(--wiki-link)", fontWeight: 600 }}>
                  {p.title}
                </div>
                {p.subtitle && (
                  <div
                    style={{
                      color: "var(--wiki-text-soft)",
                      fontSize: 11,
                      marginTop: 1,
                    }}
                  >
                    {p.subtitle}
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

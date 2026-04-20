// Generic frontmatter-driven infobox.
// The page's YAML frontmatter declares `infobox` as an ordered list of
// { section?, label?, value?, html? } rows. See wiki/Jane_Doe.md for
// the canonical example.
//
// Accepted shapes:
//   - { label: "Born", value: "2002" }
//   - { label: "Known for", html: "<a href=\"/wiki/KitchenSurvivor/\">KS</a>" }
//   - { section: "Contact" }   → renders as a section divider row

export default function Infobox({ data }) {
  if (!data) return null;
  const {
    title,
    subtitle,
    image,
    image_caption,
    rows = [],
  } = data;

  return (
    <aside className="wiki-infobox" aria-label="Infobox">
      {title && <div className="wiki-infobox-title">{title}</div>}

      {(image || image_caption) && (
        <div className="wiki-infobox-image">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={title || ""} style={{ width: "100%" }} />
          ) : (
            <div className="placeholder">[portrait]</div>
          )}
          {image_caption && (
            <div className="wiki-infobox-caption">{image_caption}</div>
          )}
        </div>
      )}

      <table>
        <tbody>
          {rows.map((row, i) => {
            if (row.section) {
              return (
                <tr key={i}>
                  <td colSpan={2} className="wiki-infobox-section">
                    {row.section}
                  </td>
                </tr>
              );
            }
            return (
              <tr key={i}>
                <th>{row.label}</th>
                <td>
                  {row.html ? (
                    <span dangerouslySetInnerHTML={{ __html: row.html }} />
                  ) : (
                    <span style={{ whiteSpace: "pre-line" }}>{row.value}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </aside>
  );
}

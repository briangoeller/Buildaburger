/* ============================================================
   Buildaburger — single burger viewer
   Reads ?id=<slug>, finds entry in manifest, fetches and renders
   the matching markdown file.
   ============================================================ */

(async function () {
  const container = document.getElementById("burger");
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("id");

  if (!slug) {
    container.innerHTML = notFound("No burger requested. <a href='index.html'>Back to the counter</a>.");
    return;
  }

  let manifest;
  try {
    const res = await fetch("burgers/manifest.json", { cache: "no-store" });
    if (!res.ok) throw new Error("manifest fetch failed: " + res.status);
    manifest = await res.json();
  } catch (err) {
    container.innerHTML = notFound("Could not load manifest. " +
      "If this is a local file:// open, run a local server or push to GitHub Pages.");
    console.error(err);
    return;
  }

  const entry = (manifest.burgers || []).find(function (b) { return b.slug === slug; });
  if (!entry) {
    container.innerHTML = notFound(
      "No burger with id <code>" + escapeHtml(slug) + "</code>. " +
      "<a href='index.html'>Back to the counter</a>."
    );
    return;
  }

  let markdown = "";
  try {
    const res = await fetch("burgers/" + slug + ".md", { cache: "no-store" });
    if (res.ok) markdown = await res.text();
  } catch (err) {
    console.warn("No body markdown for " + slug, err);
  }

  document.title = entry.title + " — Buildaburger";

  const bodyHtml = markdown ? marked.parse(markdown) :
    "<p><em>No notes yet for this burger. Ingredients are still on the counter.</em></p>";

  const dateLine = buildDateLine(entry);

  const linksHtml = (entry.links && entry.links.length)
    ? '<section class="burger__links">' +
        '<h2 class="burger__links-title">Where this lives</h2>' +
        '<ul>' +
          entry.links.map(function (l) {
            return '<li><a href="' + escapeAttr(l.url) + '" target="_blank" rel="noopener">' +
              escapeHtml(l.label) + ' &nearr;</a></li>';
          }).join("") +
        '</ul>' +
      '</section>'
    : '';

  container.innerHTML =
    '<a class="burger__back" href="index.html">&larr; back to the counter</a>' +
    '<header class="burger__head">' +
      '<div>' +
        '<h1 class="burger__title">' + escapeHtml(entry.title) + '</h1>' +
        '<div class="burger__meta">' + dateLine + '</div>' +
      '</div>' +
      renderStamp(entry.state, "lg") +
    '</header>' +
    '<div class="burger__body">' + bodyHtml + '</div>' +
    linksHtml;
})();

/* ------------------------------------------------------------ */

function buildDateLine(entry) {
  const parts = [];
  if (entry.started) {
    parts.push('<span class="burger__meta-item"><strong>Started</strong>' +
      escapeHtml(entry.started) + '</span>');
  }
  if (entry.served) {
    parts.push('<span class="burger__meta-item"><strong>Served</strong>' +
      escapeHtml(entry.served) + '</span>');
  }
  if (entry.tags && entry.tags.length) {
    parts.push('<span class="burger__meta-item"><strong>Tags</strong>' +
      entry.tags.map(escapeHtml).join(" · ") + '</span>');
  }
  return parts.join("");
}

function renderStamp(state, size) {
  const label = state === "served" ? "Served"
              : state === "grill"  ? "On Grill"
              : "Raw";
  const sizeClass = size === "lg" ? " stamp--lg" : "";
  return (
    '<span class="stamp stamp--' + state + sizeClass + '" aria-label="Status: ' + label + '">' +
      '<span class="stamp__inner">' +
        '<span class="stamp__top">Buildaburger</span>' +
        '<span class="stamp__main">' + label + '</span>' +
        '<span class="stamp__bottom">Est. 2026</span>' +
      '</span>' +
    '</span>'
  );
}

function notFound(message) {
  return '<a class="burger__back" href="index.html">&larr; back to the counter</a>' +
    '<div class="burger__body"><p>' + message + '</p></div>';
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s) { return escapeHtml(s); }

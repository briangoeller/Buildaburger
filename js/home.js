/* ============================================================
   Buildaburger — home page
   Loads burgers/manifest.json and renders sections by state.
   ============================================================ */

(async function () {
  const container = document.getElementById("burger-sections");

  let manifest;
  try {
    const res = await fetch("burgers/manifest.json", { cache: "no-store" });
    if (!res.ok) throw new Error("manifest fetch failed: " + res.status);
    manifest = await res.json();
  } catch (err) {
    container.innerHTML =
      '<p class="loading">Could not load manifest. ' +
      "If you opened this with a <code>file://</code> URL, " +
      "run a local server (see README) or push to GitHub Pages.</p>";
    console.error(err);
    return;
  }

  const burgers = manifest.burgers || [];

  // Order matters: served first (the proof), then grill, then raw.
  const sections = [
    {
      key: "served",
      title: "Served",
      blurb: "Plated. A conclusion, a published artifact, or a decision reached.",
      modifier: "served"
    },
    {
      key: "grill",
      title: "On the Grill",
      blurb: "Actively cooking. Real progress, not finished.",
      modifier: "grill"
    },
    {
      key: "raw",
      title: "Raw Ingredients",
      blurb: "Early, loose, in the puzzle space.",
      modifier: "raw"
    }
  ];

  container.innerHTML = "";

  sections.forEach(function (section) {
    const items = burgers.filter(function (b) { return b.state === section.key; });
    if (!items.length) return;

    const sectionEl = document.createElement("section");
    sectionEl.className = "section";
    sectionEl.innerHTML =
      '<div class="section__header">' +
        '<h2 class="section__title section__title--' + section.modifier + '">' +
          escapeHtml(section.title) +
        '</h2>' +
        '<span class="section__count">' +
          items.length + " " + (items.length === 1 ? "burger" : "burgers") +
        '</span>' +
      '</div>' +
      '<div class="burgers">' +
        items.map(renderCard).join("") +
      '</div>';

    container.appendChild(sectionEl);
  });

  if (!container.children.length) {
    container.innerHTML =
      '<p class="loading">No burgers yet. ' +
      "Add one to <code>burgers/manifest.json</code>.</p>";
  }
})();

/* ------------------------------------------------------------ */

function renderCard(b) {
  const dateLine = b.state === "served" && b.served
    ? "Served " + b.served
    : b.state === "grill" && b.started
      ? "Since " + b.started
      : b.state === "raw" && b.started
        ? "From " + b.started
        : "";

  const tags = (b.tags || [])
    .map(function (t) { return '<span class="tag">' + escapeHtml(t) + "</span>"; })
    .join("");

  return (
    '<a class="burger-card" href="burger.html?id=' + encodeURIComponent(b.slug) + '">' +
      '<div class="burger-card__stamp-wrap">' +
        renderStamp(b.state) +
      '</div>' +
      '<h3 class="burger-card__title">' + escapeHtml(b.title) + '</h3>' +
      '<p class="burger-card__summary">' + escapeHtml(b.summary || "") + '</p>' +
      '<div class="burger-card__meta">' +
        (dateLine ? '<span class="burger-card__date">' + escapeHtml(dateLine) + '</span>' : '') +
        '<span class="burger-card__tags">' + tags + '</span>' +
      '</div>' +
    '</a>'
  );
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

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

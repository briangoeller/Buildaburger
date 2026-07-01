/* ============================================================
   Buildaburger — Kitchen page
   Loads manifest.json, renders the checklist, handles toggle
   state locally, exports updated manifest for paste-to-GitHub.
   ============================================================ */

const TASK_KEYS = ["rewrite", "repo", "artifacts", "upload", "crosspost"];
const TASK_LABELS = {
  rewrite: "Rewrite",
  repo: "Repo",
  artifacts: "Artifacts",
  upload: "Upload",
  crosspost: "Cross-post"
};

const STATE_ORDER = { served: 0, grill: 1, raw: 2 };
const STATE_LABEL = { served: "Served", grill: "On grill", raw: "Raw" };

// Cycles: true → false → "na" → true
const CYCLE = { true: false, false: "na", na: true };

// Pending changes live in localStorage until exported.
const LS_KEY = "buildaburger-kitchen-pending-v1";

let manifest = null;
let pending = {}; // { slug: { rewrite: bool|"na", ..., notes: string } }

/* ============================================================
   Init
   ============================================================ */

(async function init() {
  try {
    const res = await fetch("burgers/manifest.json", { cache: "no-store" });
    if (!res.ok) throw new Error("manifest fetch failed: " + res.status);
    manifest = await res.json();
  } catch (err) {
    document.getElementById("kitchen-rows").innerHTML =
      '<tr><td colspan="9" class="loading">Could not load manifest. ' +
      "Run a local server or push to GitHub Pages.</td></tr>";
    console.error(err);
    return;
  }

  loadPending();
  seedDefaultsIfMissing();
  render();
  wireControls();
})();

/* ============================================================
   Pending state management
   ============================================================ */

function loadPending() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) pending = JSON.parse(raw);
  } catch (e) {
    pending = {};
  }
}

function savePending() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(pending));
  } catch (e) {
    console.warn("Could not persist pending:", e);
  }
}

// Merged view: manifest defaults + pending overrides
function todosFor(burger) {
  const base = burger.todos || {};
  const overrides = pending[burger.slug] || {};
  const merged = {};
  for (const key of TASK_KEYS) {
    merged[key] = overrides.hasOwnProperty(key) ? overrides[key] : (base.hasOwnProperty(key) ? base[key] : false);
  }
  merged.notes = overrides.hasOwnProperty("notes") ? overrides.notes : (base.notes || "");
  return merged;
}

function hasPendingChanges() {
  return Object.keys(pending).length > 0;
}

// Was this specific cell modified?
function isCellPending(slug, key) {
  return pending[slug] && pending[slug].hasOwnProperty(key);
}

/* ============================================================
   Default seeding — plausible starting state per burger state
   ============================================================ */

function seedDefaultsIfMissing() {
  for (const burger of manifest.burgers) {
    if (!burger.todos) {
      burger.todos = defaultTodosFor(burger);
    }
  }
}

function defaultTodosFor(burger) {
  // Sensible starting checkbox state per burger state,
  // plus a small honest calibration reflecting what actually exists.
  const notes = "";
  switch (burger.state) {
    case "served":
      // Fully checked by default; rewrite is toggleable per Brian's calibration pass
      return { rewrite: false, repo: true, artifacts: true, upload: true, crosspost: false, notes };
    case "grill":
      // Rewrite typically needed, repo and artifacts vary widely
      return { rewrite: false, repo: false, artifacts: false, upload: false, crosspost: false, notes };
    case "raw":
      // Most cells N/A by default — raw burgers rarely need a repo yet
      return { rewrite: false, repo: "na", artifacts: false, upload: "na", crosspost: "na", notes };
    default:
      return { rewrite: false, repo: false, artifacts: false, upload: false, crosspost: false, notes };
  }
}

/* ============================================================
   Rendering
   ============================================================ */

function render() {
  renderSummary();
  renderTable();
  renderExportButton();
}

function renderSummary() {
  const byState = { served: 0, grill: 0, raw: 0 };
  let totalCells = 0, doneCells = 0;

  for (const burger of manifest.burgers) {
    byState[burger.state] = (byState[burger.state] || 0) + 1;
    const todos = todosFor(burger);
    for (const key of TASK_KEYS) {
      if (todos[key] === "na") continue; // N/A cells don't count toward denominator
      totalCells++;
      if (todos[key] === true) doneCells++;
    }
  }

  const pct = totalCells === 0 ? 0 : Math.round((doneCells / totalCells) * 100);
  document.getElementById("overall-pct").textContent = pct;
  document.getElementById("overall-fill").style.width = pct + "%";
  document.getElementById("served-count").textContent = byState.served || 0;
  document.getElementById("grill-count").textContent = byState.grill || 0;
  document.getElementById("raw-count").textContent = byState.raw || 0;
}

function renderTable() {
  const hideComplete = document.getElementById("hide-complete").checked;
  const stateFilter = document.getElementById("filter-state").value;

  // Preserve manifest order — that's the state-sorted order from index.html.
  const rows = manifest.burgers
    .filter(b => stateFilter === "all" || b.state === stateFilter)
    .filter(b => {
      if (!hideComplete) return true;
      const todos = todosFor(b);
      return !TASK_KEYS.every(k => todos[k] === true || todos[k] === "na");
    })
    .map(renderRow)
    .join("");

  document.getElementById("kitchen-rows").innerHTML = rows ||
    '<tr><td colspan="9" class="loading">Nothing matches the current filters.</td></tr>';
}

function renderRow(burger) {
  const todos = todosFor(burger);
  const denom = TASK_KEYS.filter(k => todos[k] !== "na").length;
  const num = TASK_KEYS.filter(k => todos[k] === true).length;
  const pct = denom === 0 ? 100 : Math.round((num / denom) * 100);

  const cells = TASK_KEYS.map(k => renderTaskCell(burger.slug, k, todos[k])).join("");

  const noteCell = renderNoteCell(burger.slug, todos.notes);

  return (
    '<tr data-slug="' + escapeAttr(burger.slug) + '">' +
      '<td class="col-burger burger-name">' +
        '<a href="burger.html?id=' + encodeURIComponent(burger.slug) + '">' +
          escapeHtml(burger.title) +
        '</a>' +
      '</td>' +
      '<td class="col-state">' +
        '<span class="state-tag state-tag--' + burger.state + '">' +
          escapeHtml(STATE_LABEL[burger.state] || burger.state) +
        '</span>' +
      '</td>' +
      cells +
      '<td class="col-notes">' + noteCell + '</td>' +
      '<td class="col-progress">' +
        '<span class="row-progress">' +
          '<span class="row-progress__bar"><span class="row-progress__fill" style="width:' + pct + '%"></span></span>' +
          '<span>' + pct + '%</span>' +
        '</span>' +
      '</td>' +
    '</tr>'
  );
}

function renderTaskCell(slug, key, value) {
  let className = "task-cell";
  let content = "·";
  if (value === true) { className += " task-cell--done"; content = "✓"; }
  else if (value === "na") { className += " task-cell--na"; content = "—"; }
  else { className += " task-cell--undone"; }

  if (isCellPending(slug, key)) className += " task-cell--pending";

  return (
    '<td class="col-task">' +
      '<span class="' + className + '" ' +
        'data-slug="' + escapeAttr(slug) + '" ' +
        'data-key="' + escapeAttr(key) + '" ' +
        'title="' + escapeAttr(TASK_LABELS[key] || key) + '" ' +
        'role="button" tabindex="0">' +
        content +
      '</span>' +
    '</td>'
  );
}

function renderNoteCell(slug, note) {
  const hasNote = note && note.trim().length > 0;
  const className = "notes-cell" + (hasNote ? " notes-cell--has-note" : "");
  const title = hasNote ? note.replace(/"/g, "'").slice(0, 200) : "Add a note";
  return (
    '<span class="' + className + '" ' +
      'data-slug="' + escapeAttr(slug) + '" ' +
      'data-action="edit-note" ' +
      'title="' + escapeAttr(title) + '" ' +
      'role="button" tabindex="0">' +
      (hasNote ? "●" : "＋") +
    '</span>'
  );
}

function renderExportButton() {
  const btn = document.getElementById("export-btn");
  const note = document.getElementById("pending-note");
  const pendingCount = Object.keys(pending).length;
  if (pendingCount > 0) {
    btn.disabled = false;
    note.textContent = pendingCount + " burger" + (pendingCount === 1 ? "" : "s") + " pending export";
  } else {
    btn.disabled = true;
    note.textContent = "";
  }
}

/* ============================================================
   Interaction wiring
   ============================================================ */

function wireControls() {
  document.getElementById("hide-complete").addEventListener("change", render);
  document.getElementById("filter-state").addEventListener("change", render);
  document.getElementById("export-btn").addEventListener("click", exportManifest);
  document.getElementById("reset-btn").addEventListener("click", resetPending);

  // Delegated click handler on the table body
  document.getElementById("kitchen-rows").addEventListener("click", handleTableClick);
  document.getElementById("kitchen-rows").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTableClick(e);
    }
  });

  // Notes modal
  document.getElementById("notes-modal-cancel").addEventListener("click", closeNotesModal);
  document.getElementById("notes-modal-save").addEventListener("click", saveNoteFromModal);
  document.getElementById("notes-modal").addEventListener("click", (e) => {
    if (e.target.id === "notes-modal") closeNotesModal();
  });
}

function handleTableClick(e) {
  const cell = e.target.closest(".task-cell, .notes-cell");
  if (!cell) return;
  const slug = cell.dataset.slug;
  const action = cell.dataset.action;

  if (action === "edit-note") {
    openNotesModal(slug);
    return;
  }

  const key = cell.dataset.key;
  if (!slug || !key) return;

  // Compute new value by cycling
  const burger = manifest.burgers.find(b => b.slug === slug);
  const currentTodos = todosFor(burger);
  const currentValue = currentTodos[key];
  const newValue = CYCLE[String(currentValue)];

  // Compare to the burger's manifest-baseline; if we're back to baseline, remove the pending override
  const baseline = (burger.todos && burger.todos[key] !== undefined) ? burger.todos[key] : false;

  if (!pending[slug]) pending[slug] = {};
  if (newValue === baseline) {
    delete pending[slug][key];
    if (Object.keys(pending[slug]).length === 0) delete pending[slug];
  } else {
    pending[slug][key] = newValue;
  }

  savePending();
  render();
}

/* ============================================================
   Notes modal
   ============================================================ */

let notesModalSlug = null;

function openNotesModal(slug) {
  notesModalSlug = slug;
  const burger = manifest.burgers.find(b => b.slug === slug);
  const todos = todosFor(burger);
  document.getElementById("notes-modal-title").textContent = burger.title;
  document.getElementById("notes-modal-textarea").value = todos.notes || "";
  document.getElementById("notes-modal").classList.add("is-open");
  document.getElementById("notes-modal-textarea").focus();
}

function closeNotesModal() {
  document.getElementById("notes-modal").classList.remove("is-open");
  notesModalSlug = null;
}

function saveNoteFromModal() {
  if (!notesModalSlug) return;
  const value = document.getElementById("notes-modal-textarea").value;
  const burger = manifest.burgers.find(b => b.slug === notesModalSlug);
  const baseline = (burger.todos && burger.todos.notes) || "";

  if (!pending[notesModalSlug]) pending[notesModalSlug] = {};
  if (value === baseline) {
    delete pending[notesModalSlug].notes;
    if (Object.keys(pending[notesModalSlug]).length === 0) delete pending[notesModalSlug];
  } else {
    pending[notesModalSlug].notes = value;
  }

  savePending();
  closeNotesModal();
  render();
}

/* ============================================================
   Export & reset
   ============================================================ */

function exportManifest() {
  // Build a fresh manifest with pending changes applied to each burger's todos block
  const out = JSON.parse(JSON.stringify(manifest));

  for (const burger of out.burgers) {
    const overrides = pending[burger.slug] || {};
    if (!burger.todos) burger.todos = defaultTodosFor(burger);
    for (const key of TASK_KEYS) {
      if (overrides.hasOwnProperty(key)) burger.todos[key] = overrides[key];
    }
    if (overrides.hasOwnProperty("notes")) burger.todos.notes = overrides.notes;
  }

  const json = JSON.stringify(out, null, 2) + "\n";

  // Try clipboard first, fall back to a download blob
  const attemptClipboard = navigator.clipboard && window.isSecureContext;
  if (attemptClipboard) {
    navigator.clipboard.writeText(json).then(() => {
      confirmExport("Manifest copied to clipboard. Paste it over the existing burgers/manifest.json in GitHub, commit, push.");
      // Clear pending after successful export — the user has the authoritative copy
      pending = {};
      savePending();
      // Also update our in-memory manifest so the UI reflects the new baseline
      applyPendingToManifest(out);
      render();
    }).catch(err => {
      console.warn("Clipboard write failed, falling back to download", err);
      downloadFallback(json);
    });
  } else {
    downloadFallback(json);
  }
}

function applyPendingToManifest(exportedManifest) {
  // After a successful export, the exported manifest becomes our in-memory truth.
  manifest = exportedManifest;
}

function downloadFallback(json) {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "manifest.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  confirmExport("Downloaded manifest.json. Replace the existing file in burgers/, commit, push.");
}

function confirmExport(message) {
  const note = document.getElementById("pending-note");
  note.textContent = "✓ " + message;
  note.style.color = "var(--served)";
  setTimeout(() => {
    note.style.color = "";
    renderExportButton();
  }, 6000);
}

function resetPending() {
  if (!hasPendingChanges()) return;
  if (!confirm("Discard all pending checkbox and note changes since your last export?")) return;
  pending = {};
  savePending();
  render();
}

/* ============================================================
   Utilities
   ============================================================ */

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s) { return escapeHtml(s); }

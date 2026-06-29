# Buildaburger

A polymath's index of thought projects, sorted by doneness.

A static site, no build step, no framework, no database. Add a burger by editing a JSON file and dropping a markdown file. That's it.

---

## File map

```
buildaburger/
├── index.html          # Home — lists all burgers by state
├── burger.html         # Template for individual burger pages
├── css/style.css       # All styling
├── js/
│   ├── home.js         # Renders the home page
│   └── viewer.js       # Renders a single burger
└── burgers/
    ├── manifest.json   # Index of all burgers (source of truth for metadata)
    └── *.md            # One markdown file per burger (body content)
```

## The three states

| State | What it means |
|-------|---------------|
| **raw** | Early, loose, in the puzzle space. Ingredients on the counter. |
| **grill** | Actively cooking. Real progress, not finished. |
| **served** | Plated. Conclusion reached, artifact shipped, or decision made. |

A burger can move between states. Edit its `state` in `manifest.json`.

---

## Adding a burger

1. **Add an entry** to `burgers/manifest.json`:

   ```json
   {
     "slug": "my-new-burger",
     "title": "My New Burger",
     "state": "raw",
     "started": "Jun 2026",
     "summary": "One sentence on what's coming together here.",
     "tags": ["tag1", "tag2"],
     "links": [
       { "label": "GitHub repo", "url": "https://github.com/..." }
     ]
   }
   ```

2. **Create a markdown file** at `burgers/<slug>.md` with the body content. Plain markdown — headings, paragraphs, lists, links, blockquotes all render.

3. **Push.**

When a burger gets served, add a `"served": "Mon Year"` field and flip its `state` to `"served"`. The home page resorts itself.

---

## Field reference (manifest.json)

| Field | Required | Notes |
|-------|----------|-------|
| `slug` | yes | URL-safe identifier. Must match the markdown filename. |
| `title` | yes | Display title. |
| `state` | yes | `"raw"`, `"grill"`, or `"served"`. |
| `started` | optional | Free-form date string, e.g. `"Mar 2026"`. |
| `served` | optional | Same format. Only meaningful when `state === "served"`. |
| `summary` | yes | One-line summary for the card. |
| `tags` | optional | Array of strings. |
| `links` | optional | Array of `{label, url}` objects. Renders at the foot of the burger page. |

---

## Running it

### Locally

Because the site fetches `manifest.json` and `.md` files, opening `index.html` directly from your file system will **not work** (browsers block local `fetch()` calls). Run a simple local server instead:

```bash
# from inside the buildaburger/ directory
python3 -m http.server 8000
```

Then visit <http://localhost:8000/>.

### Public (GitHub Pages)

1. Create a public GitHub repo and push this folder.
2. In repo Settings → Pages, set Source to `main` branch, root.
3. Wait a minute, then visit `https://<username>.github.io/<repo-name>/`.

That's the whole deploy.

---

## The private burger problem (read me)

The architecture decision: **public static site, no private backend.** That means anything on this site is genuinely public. If you have a burger that shouldn't be visible yet — unlaunched IP, sensitive interior work — keep it *out* of `manifest.json` until you're ready to launch it. The "launch event" is the moment you add the entry.

For tracking the private burgers themselves, keep a parallel `manifest.json` in a private repo or local-only folder using the same schema. When one is ready to plate, move it over.

---

## Design notes

- Fonts: Archivo Black (display), Familjen Grotesk (UI), Source Serif 4 (body), JetBrains Mono (data). All from Google Fonts.
- Colors live as CSS custom properties at the top of `css/style.css`. Change one variable to retheme.
- The doneness stamp is the signature element. If you ever change states, the stamp colors are in the same custom-property block.
- No analytics, no third-party scripts except the marked.js markdown parser (CDN).
- Responsive, keyboard-focusable, respects `prefers-reduced-motion`.

---

## What this site is not

- Not a portfolio. State is a verdict on the work, not a claim about you.
- Not a wiki. There's no expectation of comprehensive coverage.
- Not serious. Until it is.

## The idea

A gazetteer of frameworks. Not a glossary, not a wiki — a curated, lineage-linked catalog of every named structured way of seeing a class of situations, sorted into rigor bands so a reader can tell at a glance whether they're looking at a falsifiable theory, an organizing schema, an institutional doctrine, or an esoteric tradition.

## What came together

The taxonomy hardened through several passes. A framework is *named, structured, makes claims about relevance, is portable across instances, and shapes downstream reasoning.* Eight rigor bands ended up necessary: formal-scientific, structured-empirical, organizing-schema, doctrinal-institutional, regulatory-standard, philosophical-tradition, contemplative-tradition, esoteric-tradition.

A second manifest pass added 191 entries across project management, history, esoteric traditions, negotiation, sports and performance, forecasting, complexity science, AI governance, banking, accounting, and music theory. Pass II enrichment moved each entry into a 22-field JSON record with per-field confidence flags and a `needs_verification` boolean, so the catalog could honestly carry uncertainty rather than pretending not to have any.

A naming pass landed on **The Cartograph, a Gazetteer of Frameworks** — keeping "frameworks" for audience accessibility while letting "Cartograph" and "Gazetteer" do the elevating work. The site shipped at `briangoeller.github.io/Framework-Catalog`.

## State of play

JSONL files in git as the canonical source of truth; SQLite as a derived runtime artifact for queries. Two editorial issues are still flagged: overuse of the word *substantial* in enriched summaries, and stale cross-references to "other batches" that no longer make sense in context. Both are queued for an editorial pass.

A "Cosplayer frameworks" category was added later — unfalsifiable predictors, named tautologies, borrowed-rigor metaphors, survivorship frameworks. Two-tier inclusion rule: falsifiability required for predictive frameworks; usefulness-in-cutting-problems sufficient for organizing lenses. That distinction may end up being the most useful thing the catalog produces.

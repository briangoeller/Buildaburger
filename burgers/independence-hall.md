## The idea

Most voter-alignment tools are performative. They ask questions that make the reader feel seen and produce results that confirm what they already believed. The party affiliations they surface are almost always the ones the reader would have named unprompted. That's not a match — that's a mirror.

Independence Hall is a **blind** political alignment quiz: the voter sees policy statements without party labels, scores them on a forced-choice scale, and receives a match against six party platforms (Libertarian, Green, Democratic, Republican, Constitution, Forward) that they may or may not agree with. The point is to let the framework tell the voter something they didn't already know about themselves.

## The instrument

Layer 1 is a 25-question quiz. Four-point forced-choice scale, no neutral option — because "neutral" on a political question is almost always "I haven't thought about this," and letting people hide there produces the mirror effect the tool exists to avoid. After the quiz, eight domains get importance weighting (High = 3×, Med = 2×, Low = 1×).

The match formula:

> similarity = 1 − |voter_score − party_score| / 3

weighted by the voter's domain priorities. Party pre-scores are on the same 0–4 scale, with 0 reserved for "no position" (used for the Forward Party on most questions, since Forward runs almost entirely on process rather than policy). Forward is scored only on the four process questions.

Calibration confirms the instrument is neutral. A voter answering 100% Republican-aligned lands: Rep 100%, CP 71%, LP 47%, Dem 39%, GP 25%, Fwd 0%. A voter answering 100% Democratic-aligned lands: Dem 100%, GP 84%, Rep 39%, LP 36%, Fwd 33%, CP 25%. The 39-39 cross-party symmetry is the load-bearing check — it says the instrument doesn't lean.

Question distribution: 10 consensus questions (≥67% agreement between the two major parties), 8 wedge questions (0% agreement), 7 middle-ground. That mix keeps the quiz from being either flattering (all consensus) or hostile (all wedges).

## The 22 sub-domains and the honesty problem

The instrument's current weakness is that it's *too clean*. Platform-derived party scores are strategic documents, not empirical voter distributions. Real voters don't cluster as tightly around their party's platform as the platform documents suggest, and the instrument produces sharper matches than a real voter population would justify. Two fixes are in progress.

First, the eight major domains split into 22 sub-domains — Civil Liberties splits into gun rights, drug policy, privacy/surveillance, criminal justice. Economic splits into tax, trade/labor, safety net, monetary, education. Social splits into abortion, LGBTQ+, racial equity, gender identity. Environmental into climate mechanism, energy production. Foreign into military spending, interventionism. Immigration into border enforcement, legal status. Healthcare into system, drug pricing. Governance into electoral reform, fed/state power, campaign finance. Each sub-domain gets exactly one quiz question. The result is more differentiated party scores that don't average down to a strategic-document caricature.

Second, Layer 2 — the **Dive Deeper** feature — replaces the 4-point normalization with direct policy statement selection. For each sub-domain, the voter is shown the actual platform planks from the six parties (blind), clicks once to indicate primary agreement, twice to indicate secondary. This trades scale-normalized precision for platform-plank realism.

Layer 3, **Full Declaration**, is Layer 2 completed across all 22 sub-domains — the tool used by a voter (or a candidate) who wants to state their full policy position on the record.

## Chestnut Street Declaration

The candidate-facing sub-brand. Same instrument, run by a candidate as a self-declaration rather than by a voter as a match tool. The name is deliberately Constitution-era in cadence — this is a document, not a poll — and it gives candidates a structured, blind way to publish their actual positions across all 22 sub-domains without the strategic hedging that survey answers invite.

## State of play

Layer 1 (the quiz) is essentially built. Layer 2 architecture is settled but not implemented. Layer 3 is a straightforward composition of Layer 2. The 22-sub-domain expansion is decided; the sub-domain-by-sub-domain party plank collection is the next mechanical piece of work.

Commercial model: freemium for individual voters (Layers 1 and 2 free; full Declaration or export requires account), B2B political data licensing for campaigns, pollsters, and journalists who want access to voter-response distributions with proper privacy handling.

The longer-run methodological note worth preserving: empirical party scores derived from actual voter surveys should eventually replace the platform-derived scores. That's the version of the instrument that stops being "too clean" for good.

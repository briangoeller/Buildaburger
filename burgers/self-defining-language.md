## The idea

Natural languages are lossy. The meaning of a word lives beside its spelling — in convention, context, and the tired agreement of everyone using it — never inside its form. Self-Defining Language inverts that. A word is a well-formed nested expression, and its meaning is fully recoverable from its structure. The spelling *is* the definition.

The commitment underneath is unforgiving: full taxonomic decomposition, all the way down, even when it produces unwieldy word-forms. That isn't a defect to be smoothed later — it's the point. A word carries its own derivation. If reading it back requires context the form doesn't contain, the form is wrong.

## The architecture

A typed term algebra — equational and computational, not free — modeled as a layered, typed, directed hypergraph. Each prime anchors its own shell-stack; the rules form a second coupled graph rather than living off to the side. The type system is closed at four members: **entity, relation, event, property**, with a defined admission criterion for what earns type-hood. Several concepts that feel like types on first pass — quantity, set, direction, sex — were demoted to dimensions or rule-outputs. Quantity in particular lost its type status on a pre-conceptual argument: you cannot have a *number of* things before you have the things.

The first domain drafted is kinship — two primitive relations, one primitive property, three rules, and worked normal-form derivations for eight kin terms. Small enough to hold in the hand, structured enough to prove the decomposition machinery runs.

## Why natural languages sit *below* it

The inversion is the whole thesis and worth stating precisely. SDL is not a translation layer bolted between English and French. It's a precision ceiling *above* all natural languages — the algebra is the ground truth, and every natural language is a lossy projection down from it. Universal translation (any language → algebra → any other language) is not a feature that got added. It's an emergent property of the architecture: once meaning is recoverable from form, the projection runs in both directions and through any surface language you like. The 26-letter alphabet is just one interchangeable notation; binary or hex encode the same terms.

## Undecidability as a feature

The riskiest fork was making the algebra equational/computational rather than free. A free algebra would have been safer and more tractable. The equational choice quietly leaves the door open to undecidability — and that door was left open *on purpose*. It's the most interesting research risk in the whole project. As the domain coverage grows past kinship and the rule graph thickens, the open question is whether term-equality stays decidable or whether the system earns a genuine halting-style limit. A formal language that can be *broken* by an undecidability result is in better shape than one that can't — same disposition as the Quantum Gravity burger's line about a speculation you can end with a graph.

This is where SDL touches the rest of the pile. The **Opacity Thesis** and the **Generator Thesis** both run on the same underlying mathematics — Chaitin, Kolmogorov, the incompressibility of a structure to any observer embedded below it. Those two apply it to agency-attribution and to creative generation. SDL is the constructive inverse: instead of asking what an observer *cannot* certify from the outside, it asks how much meaning can be forced *into* the form so that nothing is left for context to smuggle. Same fault line, approached from the opposite bank.

## State of play

Raw, and honestly raw. The v0.1 foundation is real — typed term algebra, closed type system, the kinship domain, a fifteen-entry decision log of settled architectural forks, all carried between sessions in a versioned spec file (`SDL-schema-v0.1.md`) so the work survives the gaps. But everything that would make it *cook* is still ahead: expanding domains beyond kinship, building the bidirectional translator, and pushing the algebra far enough to find out whether the undecidability actually bites.

The next moves are structural, not mechanical. This isn't a weekend of typing away from a deposit — it's a system still being reasoned into existence, one fork at a time, from first principles. The hypergraph structure wasn't handed to it; it was independently arrived at and then named. That's the mode this one stays in for a while yet.

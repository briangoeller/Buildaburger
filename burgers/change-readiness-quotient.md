## The idea

Most organizations don't fail at responding to change. They fail at *noticing* it. And the gap between when a change becomes observable and when it actually gets observed is where the cost accumulates. The Change Readiness Quotient is a framework for making that gap visible and, eventually, measurable.

## The four timestamps

Any change event unfolds along a pipeline:

- **T₀** — the change begins. A customer starts drifting toward a competitor. A regulatory posture starts to shift. A capability starts eroding. The moment the underlying signal exists in the world.
- **T₁** — observation becomes *possible*. The signal has propagated far enough to be detectable by an observer with the right access and instrumentation. T₀ ≠ T₁ because signals take time to reach detection thresholds.
- **T₂** — observation actually *happens*. Someone looks. Someone runs the report. The alert fires and gets read. T₂ ≠ T₁ because most orgs have the instrumentation but not the discipline of continuous review.
- **T₃** — intervention completes. Not just decided — implemented, deployed, actually changing the trajectory of the underlying situation.

The cost of the change accumulates monotonically from T₀ onward and stops accumulating at T₃. So the total damage is a function of (T₃ − T₀), and that interval decomposes into three sub-intervals with different governance and different fixability.

## The observer position is the hidden variable

The reason the interval T₂ − T₁ is often the largest is not instrumentation. It's *observer position*. An organization is not an external observer of its own processes — it's a participant in them. And a participant-observer faces a version of the measurement problem: the act of observation is itself an intervention that alters the causal trajectory. The bank that flags a balance trend and calls the customer has not measured the customer's drift; it has *acted on* it. T₀ and the intervention are not cleanly separable.

The consequence is that observer position — where in the pipeline the observer sits, and how much perturbation they introduce — is a hidden variable in every domain's change-cost calculation. Most organizations assume they are outside observers of their own processes. They aren't. And that assumption is probably responsible for more misdiagnosed change failures than any instrumentation gap.

## The quotient

For each domain, the ideal is an observer at T₀ with intervention available. Actual capability is scored:

> CRQ_domain = (precursor window utilized / total available precursor window) × intervention efficacy

Precursor window utilized is the fraction of (T₁ → T₃) that the org actually acts within. Intervention efficacy is a domain-specific measure of how much of the underlying damage the org's intervention actually reverses.

The organizational score is a weighted average of the per-domain quotients:

> CRQ_org = Σ (CRQ_domain × invertibility_weight_domain) / Σ (invertibility_weight_domain)

Invertibility weight is high for domains where fast intervention can reverse damage (customer trends, capability erosion) and low for domains where damage compounds structurally (reputational, legal). Low-invertibility domains get weighted higher because being slow in them is more expensive.

## The honesty about what this measures

The framework has a real limitation and I want to name it, because most organizational-readiness scoring tools quietly ignore this problem. **T₀ and the ideal precursor window are not empirically known without baseline work first.** You can't score the quotient on day one — you need enough historical instances of change events to reconstruct where T₀ actually sat, retrospectively, so the precursor window has a defined denominator. That calibration phase is the mechanical piece of work that turns the framework from a diagram into a measurable quantity. Any tool that skips it is producing organizational theater, not measurement.

## State of play

Framework and formula defined. The visual — a horizontal pipeline with interval widths proportional to time-in-state and observer position shown as a moveable node — exists as a design but not as a running artifact. The calibration methodology (how to reconstruct T₀ from historical incidents) is sketched but not documented in a form a bank could actually run against its own history.

Immediate near-term use: this feeds the same overall strategic-risk conversation as the Horizon Risk Assessment. Horizon asks *what* to score; CRQ asks *how ready the observer is* to score anything. They compose.

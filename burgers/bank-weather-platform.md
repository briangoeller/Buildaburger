## The idea

Central banks have been running agent-based economic models for two decades — Federal Reserve, Bank of England, ECB. They simulate cohorts of households running through economic shock scenarios and produce probabilistic outputs at the aggregate level. What they don't do, and what nobody has built, is run the same class of model **grounded in a specific bank's actual customer and transaction data at individual-account granularity**. That's the platform.

The framing is NOAA weather. NOAA doesn't predict weather by solving fluid dynamics from first principles each time it wants a forecast. It ingests observational data, runs an ensemble of models with varied assumptions, and produces probabilistic outputs with confidence intervals — not "this will happen" but "here's the distribution of outcomes." A bank version of the same architecture would ingest the bank's own transaction data, synthesize behavioral agents from it, run open-world natural-language-input scenarios against the agent population, and produce a probabilistic balance sheet and income statement impact rather than a point estimate.

**Your bank. Your customers. Your specific exposure.** That's the value proposition today's regulatory stress testing — standardized scenarios applied to aggregate portfolios — categorically cannot deliver.

## Why now

Three things had to be true for this to be buildable, and only recently have all three become true simultaneously:

- **Compute is cheap enough** to run agent-based simulation at individual-account granularity for a community-scale bank (~50K–200K accounts) at a reasonable iteration cost.
- **LLM capability is sufficient** to synthesize realistic behavioral agent profiles from real transaction sequences, and to parse open-world natural-language scenarios ("AI displaces 30% of white-collar employment in our geography over 24 months") into structured shock parameters the simulation can consume.
- **The regulatory posture is starting to move** toward something more forward-looking than the current CCAR / DFAST templates, which means there's an audience for the output that didn't exist five years ago.

None of these are speculative anymore. They're all real, today, and getting cheaper and better on quarterly time-scales.

## What the platform actually does

Four architectural layers, each with a defensible standalone value in the interim before the whole thing is composed:

**Layer 1: Customer synthesis.** Read the bank's actual transaction history, produce anonymized behavioral agents that reproduce the population's spending, saving, borrowing, and life-event patterns. Privacy-preserving by construction — no individual account is recoverable from the agent set — but statistically faithful to the underlying population.

**Layer 2: Scenario parser.** Accept natural-language scenarios from an executive, board member, or examiner. Turn "AI displaces 30% of white-collar employment in Jefferson County over 24 months" into a structured shock profile — sector-weighted employment loss, distributed over time, with wage-recovery assumptions and geographic constraints.

**Layer 3: Simulation runner.** Push the shock through the agent population over the modeled time horizon. Compute the resulting cash flows, credit performance, deposit flight, and product-line P&L impact. Run the ensemble — hundreds or thousands of instances of the same scenario with varied assumption parameters — and produce a probability distribution.

**Layer 4: Interpretation.** Present the output as a probabilistic balance sheet impact with confidence intervals, sensitivity analysis on the load-bearing assumptions, and a plain-language interpretation of what the ensemble is saying. This is the layer bank executives will actually look at.

## Why this is more marketable than the full-stack bank build

The parallel project — building an entire community bank on modern infrastructure to demonstrate the obsolescence of legacy middleware — proves a philosophical point about the industry. It's impressive. The buyer is abstract.

The Bank Weather Platform proves a *specific* point about a *specific* bank's *specific* exposure to a *specific* scenario. The buyer is a bank CEO, a bank board, or a bank regulator, and they already know they don't have this and are aware they should. The pain is named. The regulatory drift is toward wanting it. Community and mid-size banks lack the internal capability to build it themselves and would rather buy access to the platform than build the muscle.

## State of play

Concept-stage. Substantial architectural thinking exists but no code, no specification documents, no data-partnership conversations. The load-bearing next move is a specification sprint producing three documents: **domain model**, **system architecture**, **work breakdown** — none of which currently exist in written form. The rule I'm holding myself to: no code before those three documents exist. It's the single most reliable predictor of whether a project of this scale collapses under its own ambiguity.

Build approach when it's time: agentic development through Claude Code, working against the specification documents rather than a running feature backlog. The tooling has changed what's tractable for a solo builder to attempt.

The decision that gates real motion on this: whether this is a sabbatical-level commitment or a serious side-project alongside PremierBank. The two paths look very different in data strategy, in the aggressiveness of the design-partner conversation, and in the timeline from spec to prototype. That decision is not yet made.

## The idea

An isolated flywheel power supply for high-end analog audio components. A granite column with a carbon-fiber composite rim, spun up by a motor and drawing kinetic energy out through a generator and a pure sine wave inverter to feed the DAC, turntable, or phono stage that sits downstream. Zero grid connection during listening. No battery chemistry. Multiple galvanically isolated outputs from a single reservoir of stored energy.

The philosophical claim underneath the mechanical one: **the power supply is the DAC.** Paul Hynes at Border Patrol has been saying this for decades, and the sound of his DACs relative to their spec sheet is the strongest available evidence he's right. If the source of the current matters more than the chip converting it, then a genuinely isolated, mechanically-quiet, no-switching-noise source is the largest single upgrade available to an analog rig. Grid-tied regenerators (PS Audio) still couple to the grid. Battery supplies (Stromtank) degrade and introduce their own chemistry. A spinning mass with a bearing does neither.

## What came together

Physics is worked out end to end. Granite chosen as the substrate for column mass and vibration damping, not for the flywheel itself — the flywheel *rim* is CF composite, which lets us hit CF tip speeds (600–1,000 m/s pre-burst) at a lower rotating mass than steel, and fails progressively via delamination rather than fragmentation. That distinction is what makes home containment tractable: a CF composite failure shreds rather than throws, so the containment shell can be CF rather than a heavy steel ring.

Energy budget from moment of inertia and safe RPM produces a runtime long enough for real listening sessions on a single spin-up. Bearing architecture is vertical-axis on a magnetic-preload thrust bearing with a stabilizing radial bearing above — the geometry that minimizes friction losses at the cost of manufacturing complexity. A Hall effect sensor reads RPM continuously, and since I is fixed, `E = ½Iω²` gives real-time energy remaining and, divided by measured power draw, a runtime countdown on the display.

Motor-assisted spin-up is decided — hand-crank as a purist option, not as the default, because the point is a functional product not a fetish object. Pure sine wave inverter with multiple galvanically-isolated secondary windings, one per downstream component, at conservative current rating. Modular multi-column architecture reserved for the future — V1 is a single-column, single-output supply feeding one turntable.

## Why V1 is the turntable supply

Two reasons. First, turntables are the audiophile component whose power-supply sensitivity is *audible* to the widest range of listeners — the synchronous motor drives platter rotation directly, and any noise or frequency instability in the drive current shows up as wow, flutter, or rumble artifacts. A demonstrably quiet supply produces a demonstrably better result. That's the marketing story that writes itself.

Second, single-output at a defined current envelope is dramatically simpler to spec, build, and safety-certify than a multi-output supply feeding heterogeneous downstream loads. The V1 exists to prove the product, generate word-of-mouth in the vinyl community, and fund the multi-column V2 that supplies the full front end.

## The market position

| Product | Price | Limitation |
|---|---|---|
| PS Audio Power Plant | $2k–10k | still grid-connected |
| Stromtank S2500 | $18k | battery degrades, complex |
| Generic battery UPS | $200–500 | modified sine, not audiophile-grade |
| This | — | no chemistry, indefinite service life, mechanical |

The commercial framing is the Lampizator / Kondo artisan-boutique model. Not scaled manufacture, not retail distribution — hand-built runs, direct-to-customer, listener-visits-the-workshop for delivery ceremony. The customer profile that owns a turntable, a phono cartridge, and a record cleaning machine already understands the mode.

## State of play

No prototype. The gating engineering question I want to resolve before committing to a build: bearing loss at operating RPM, which determines self-discharge rate and therefore runtime. The math says it should be small; the math has been wrong before on this class of problem. Standing move is a cheap bench-scale test — small CF disk on a magnetic thrust bearing, measure the deceleration curve, extrapolate. If the loss profile is what I think it is, V1 build gets sequenced against the Radial Transducer / Tesla Shell work. If it isn't, the whole product regresses to grill status until the bearing question has a real answer.

Related to the Radial Transducer / Tesla Shell burger — both live in the same "philosophically consistent analog audio" body of work, both target the Lampizator / Border Patrol customer, and both share CF as the material language. They may end up being the two products of a small workshop rather than separate ventures.

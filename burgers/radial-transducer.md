## The idea

Two concepts on the same plate, both pointed at the same problem: how to get omnidirectional, low-distortion sound at a fraction of MBL Radialstrahler money.

**The radial transducer.** A series of carbon-fiber cylindrical rings with voice-coil windings embedded directly in the CF layup, suspended around inner magnet cylinders. Each ring operates in radial (breathing) motion. The cylinders scale in diameter per octave, forming an exponential bell profile that naturally maintains consistent *ka* (wavenumber times radius) across the frequency range. This solves the beaming problem that afflicts planar speakers while approximating MBL-style dispersion. High frequencies likely still want a conventional tweeter; the magnetic-circuit design is the primary engineering constraint.

**The Tesla shell.** A more immediately buildable companion piece — a reverse-horn waveguide that captures a loudspeaker's rear radiation and funnels it through a Tesla valve junction into a dissipation chamber containing small granular spheres. Cork granules or felt balls outperformed Styrofoam on acoustic grounds. The folded/funneled geometry creates *two independent* attenuation mechanisms: frequency-specific destructive interference from path-length differentials, and broadband progressive reflection loss. The redundancy is what makes the design robust against tuning imprecision.

## What came together

A decade of revisions, several builds, one corrected mistake mid-conversation: an early horn-length calculation assumed a shallow cone would capture off-axis rear radiation. It won't. The fix is a curved full-face collector geometry — a compression driver phase plug operating in reverse — as the practical capture surface.

## State of play

The defined first experiment is a POC comparison between **curved collector and flat baffle with central hole**, measured with REW and a calibrated measurement microphone. That's the cheapest test that produces a number you can argue about. Nothing built yet.

The transducer itself is on a longer arc. The Tesla shell could be on a bench in a weekend.

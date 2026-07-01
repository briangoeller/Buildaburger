## The idea

For certain listening conditions — untreated rooms, off-axis positions, compromised playback setups — stereo imaging is already broken. Under those conditions a proper mono presentation may sound *better* than the compromised stereo, if the mono is derived carefully rather than through naive left-right summation.

## The proposed derivation

Coherence-weighted M/S summation with decorrelated Side re-injection. In four steps:

1. Extract Mid (sum) and Side (difference) channels from the stereo source.
2. Compute inter-channel coherence across frequency bins.
3. Weight the Side signal by that coherence — keep the parts of S that carry musical information, attenuate the parts that are room artifact or mix error.
4. Re-add the weighted S to the M with random-phase decorrelation, so the resulting mono doesn't collapse to a flat point-source presentation but retains apparent width without spatial contradiction.

The target audience is audiophiles listening in less-than-ideal rooms, and headphone users on badly-mastered material where the stereo image works against the recording rather than for it.

## State of play

Scoped to a Raspberry Pi + HiFiBerry HAT proof of concept. Small, cheap, real-time. The DSP isn't hard; the interesting engineering question is calibration of the coherence-weighting curve — how aggressively to attenuate low-coherence Side content without producing an audibly filtered result. That's a listening-test loop, not a math problem.

Third audio idea in the same puzzle space as the Radial Transducer and the Granite Flywheel Power Supply. This one lives on the signal-processing side rather than the transducer or power-supply side, which means it could be a standalone product (a small DSP box) or a firmware layer on top of an existing DAC. Undecided.

// This scene was lit against three r154, where `useLegacyLights` defaulted to
// true. It scaled every light's intensity by PI, and disabled distance
// attenuation for punctual lights with `distance = 0`. The flag was removed in
// r165, so both effects have to be reproduced here or the scene renders dark.

export const LEGACY_LIGHT_SCALE = Math.PI;

// pow(d, 0) === 1, matching the constant 1.0 the legacy shader branch returned.
export const LEGACY_DECAY = 0;

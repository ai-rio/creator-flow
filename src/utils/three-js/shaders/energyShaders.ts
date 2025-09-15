/**
 * Energy Core Shader Materials - CreatorFlow Three.js Integration
 *
 * Advanced energy core shaders for organizational patterns and hexagonal structures.
 * Features controlled breathing animations and systematic processing effects.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

import * as THREE from 'three';

export interface EnergyCoreShaderUniforms {
  [uniform: string]: THREE.IUniform<any>;
  uTime: { value: number };
  uColor1: { value: THREE.Color };
  uColor2: { value: THREE.Color };
  uColor3: { value: THREE.Color };
  uColor4: { value: THREE.Color };
  uTheme: { value: number };
  uCorePosition: { value: THREE.Vector3 };
}

export const energyCoreVertexShader = `
  uniform float uTime;
  uniform vec3 uCorePosition;
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;

    // CALM BREATHING PATTERN - Confident and controlled
    float breath1 = sin(uTime * 0.35) * 0.08; // 50% slower, reduced amplitude
    float breath2 = cos(uTime * 0.55) * 0.06; // More controlled breathing

    // SYSTEMATIC pulse waves - slower, more organized
    float distanceFromCenter = length(position);
    float organizationalWave = sin(distanceFromCenter * 2.0 - uTime * 2.0) * 0.04; // Slower, calmer waves

    vec3 pos = position * (1.0 + breath1 + breath2 + organizationalWave);

    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const energyCoreFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1, uColor2, uColor3, uColor4;
  uniform float uTheme;
  uniform vec3 uCorePosition;
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
  vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
  vec3 permute(vec3 x) { return mod289(((x * 34.) + 1.) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(.2113248654, .3660254038, -.5773502692, .0243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1; i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
    vec3 m = max(.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
    m = m * m; m = m * m;
    vec3 x = 2. * fract(p * C.www) - 1.;
    vec3 h = abs(x) - .5;
    vec3 ox = floor(x + .5);
    vec3 a0 = x - ox;
    m *= 1.792842914 - 0.8537347209 * (a0 * a0 + h * h);
    vec3 g; g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130. * dot(m, g);
  }

  void main() {
    // ENHANCED CORE AS ORGANIZING HERO
    vec2 uv1 = vUv * 2.5 + vec2(uTime * 0.05);
    vec2 uv2 = vUv * 3.5 - vec2(uTime * 0.08);
    float n1 = (snoise(uv1) + 1.) * 0.5;
    float n2 = (snoise(uv2) + 1.) * 0.5;

    // ORGANIZATIONAL PATTERNS - geometric structure within chaos
    vec2 gridUv = fract(vUv * 8.0);
    float gridPattern = smoothstep(0.1, 0.2, min(gridUv.x, gridUv.y)) *
                       smoothstep(0.8, 0.9, max(gridUv.x, gridUv.y));

    // CALM organizational waves from center
    float distanceFromCenter = length(vUv - 0.5);
    float radialWave = sin(distanceFromCenter * 8.0 - uTime * 1.5) * 0.4 + 0.6; // Slower, less aggressive

    // Hexagonal organization pattern (like honeycomb structure)
    vec2 hexUv = vUv * 12.0;
    float hexPattern = sin(hexUv.x) * sin(hexUv.x + hexUv.y * 0.5773) * sin(hexUv.y * 1.1547);
    hexPattern = smoothstep(0.2, 0.8, hexPattern + 0.5);

    // STEADY organizational pulse - confident authority
    float organizationalPulse = 1.0 + 0.25 * sin(uTime * 1.0) * cos(uTime * 0.8); // Slower, more controlled

    // SYSTEMATIC processing - stable and reliable
    float processingIntensity = sin(uTime * 2.5) * cos(uTime * 1.8) * 0.2 + 0.8; // Much calmer processing

    vec3 cA = mix(uColor1, uColor2, n1);
    vec3 cB = mix(uColor3, uColor4, n2);
    vec3 mC = mix(cA, cB, smoothstep(.4, .6, n1));

    // Add organizational structures
    mC = mix(mC, mC * 1.5, gridPattern * 0.3);
    mC = mix(mC, mC * 1.3, hexPattern * 0.25);
    mC = mix(mC, mC * 1.4, radialWave * 0.2);
    mC *= organizationalPulse * processingIntensity;

    float intensity = pow(1. - length(vUv - .5) * 2., 1.5);

    // MINIMIZED OPACITY - Core no longer the hero
    float opacity = mix(
      intensity * 0.15,  // Light theme: dramatically reduced
      intensity * 0.25,  // Dark theme: subtle presence only
      uTheme
    );

    gl_FragColor = vec4(mC, opacity);
  }
`;

/**
 * Creates energy core shader material with optimized uniforms
 */
export const createEnergyCoreShaderMaterial = (uniforms: EnergyCoreShaderUniforms): THREE.ShaderMaterial => {
  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: energyCoreVertexShader,
    fragmentShader: energyCoreFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
};

/**
 * Updates energy core material colors for theme changes
 */
export const updateEnergyCoreTheme = (
  material: THREE.ShaderMaterial,
  colors: any,
  corePosition: THREE.Vector3,
  theme: 'light' | 'dark'
): void => {
  const themeValue = theme === 'dark' ? 1.0 : 0.0;

  material.uniforms.uColor1.value.copy(colors.accent);
  material.uniforms.uColor2.value.copy(colors.accent2);
  material.uniforms.uColor3.value.copy(colors.accent3);
  material.uniforms.uColor4.value.copy(colors.accent4);
  material.uniforms.uTheme.value = themeValue;
  material.uniforms.uCorePosition.value.copy(corePosition);

  // Update blending modes for optimal visibility
  material.blending = THREE.AdditiveBlending; // Keep additive for both themes
  material.needsUpdate = true;
};

const EnergyShaders = {
  createEnergyCoreShaderMaterial,
  updateEnergyCoreTheme,
  energyCoreVertexShader,
  energyCoreFragmentShader,
};

export default EnergyShaders;

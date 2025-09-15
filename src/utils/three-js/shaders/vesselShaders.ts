/**
 * Vessel Shader Materials - CreatorFlow Three.js Integration
 *
 * Advanced biological vessel processing shaders for the Aortic Vessel animation system.
 * These shaders create realistic vessel textures, internal flow patterns, and heartbeat rhythms.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

import * as THREE from 'three';

export interface VesselShaderUniforms {
  [uniform: string]: THREE.IUniform<any>;
  uTime: { value: number };
  uColor: { value: THREE.Color };
  uInternalColor: { value: THREE.Color };
  uProcessingIntensity: { value: number };
  uCorePosition: { value: THREE.Vector3 };
  uLightColor: { value: THREE.Color };
  uTheme: { value: number };
}

export const vesselVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -modelViewPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

export const vesselFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uInternalColor;
  uniform vec3 uCorePosition;
  uniform vec3 uLightColor;
  uniform float uTheme;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  float fresnel(vec3 viewDir, vec3 normal) {
    return pow(1.0 - dot(viewDir, normal), 2.5);
  }

  // Noise function for organic vessel patterns
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    float f = fresnel(normalize(vViewPosition), vNormal);

    // VESSEL HERO ENHANCEMENT - Dramatically increased prominence
    float themeFactor = step(0.5, uTheme);
    float heroBoost = 4.5; // Massive boost for vessel prominence
    float vesselGlow = mix(3.2, 4.8, themeFactor); // Enhanced vessel glow

    // CENTRAL VESSEL STRUCTURE - Dominant base presence
    vec3 vesselStructure = uColor * (0.35 + f * 0.8) * heroBoost;

    // INTERNAL VESSEL FLOWS - Blood vessel processing patterns
    float flowTime = uTime * 0.15;
    vec2 flowUv = vUv * 6.0 + vec2(flowTime, flowTime * 0.7);
    float vesselFlow = noise(flowUv) * noise(flowUv * 2.1) * 0.6 + 0.4;

    // PULSING BIOLOGICAL RHYTHM - Like a living vessel
    float heartbeat = sin(uTime * 1.8) * 0.3 + 0.7; // Biological pulse
    float vesselPulse = sin(uTime * 2.3 + vUv.x * 8.0) * 0.2 + 0.8;

    // PROCESSING STREAMS within vessel walls
    float streamPattern = sin((vUv.x + vUv.y) * 16.0 - uTime * 3.0) * 0.4 + 0.6;
    float processingIntensity = vesselFlow * heartbeat * vesselPulse * streamPattern;

    vec3 internalProcessing = uInternalColor * processingIntensity * vesselGlow;

    // VESSEL AUTHORITY LIGHTING - Ring as the central organizer
    float vessel_presence = 1.0 - smoothstep(0.0, 2.0, length(vViewPosition));
    vec3 authorityLight = uLightColor * vessel_presence * heroBoost * 0.6;

    // LIVING VESSEL TEXTURE - Organic material appearance
    vec2 vesselTexUv = vUv * 12.0 + vec2(uTime * 0.08, uTime * 0.12);
    float vesselTexture = noise(vesselTexUv) * 0.3 + 0.7;
    float materialDepth = noise(vUv * 8.0) * 0.2 + 0.8;

    vec3 finalColor = (vesselStructure + internalProcessing + authorityLight) * vesselTexture * materialDepth;

    // VESSEL HERO OPACITY - Commanding presence
    float vesselOpacity = (f * 0.7 + processingIntensity * 0.5) * heroBoost;
    vesselOpacity *= mix(0.8, 1.2, themeFactor); // Enhanced for both themes

    // Clamp to prevent overexposure while maintaining prominence
    vesselOpacity = min(vesselOpacity, 0.95);

    gl_FragColor = vec4(finalColor, vesselOpacity);
  }
`;

/**
 * Creates vessel shader material with optimized uniforms
 */
export const createVesselShaderMaterial = (uniforms: VesselShaderUniforms): THREE.ShaderMaterial => {
  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vesselVertexShader,
    fragmentShader: vesselFragmentShader,
    transparent: true,
  });
};

/**
 * Professional color system with theme-aware palettes
 */
export const getVesselThemeColors = (isDark: boolean) => ({
  accent: new THREE.Color(isDark ? '#6D28D9' : '#5B21B6'), // Deeper, more authoritative purple
  accent2: new THREE.Color(isDark ? '#7C3AED' : '#6D28D9'), // Rich, professional tones
  accent3: new THREE.Color(isDark ? '#8B5CF6' : '#7C3AED'), // Sophisticated gradation
  accent4: new THREE.Color(isDark ? '#A78BFA' : '#8B5CF6'), // Refined highlights
  success: new THREE.Color(isDark ? '#059669' : '#047857'), // Deeper, more trustworthy green
  warning: new THREE.Color(isDark ? '#D97706' : '#B45309'), // Serious, professional amber
  danger: new THREE.Color(isDark ? '#DC2626' : '#B91C1C'), // Authoritative red
  ring: new THREE.Color(isDark ? '#374151' : '#374151'), // Enhanced contrast for dark theme
  ringInternal: new THREE.Color(isDark ? '#8B5CF6' : '#5B21B6'), // Brighter internal glow for dark theme
});

/**
 * Updates vessel material colors for theme changes
 */
export const updateVesselTheme = (material: THREE.ShaderMaterial, theme: 'light' | 'dark'): void => {
  const colors = getVesselThemeColors(theme === 'dark');
  const themeValue = theme === 'dark' ? 1.0 : 0.0;

  // Update all material colors immediately
  material.uniforms.uColor.value.copy(colors.ring);
  material.uniforms.uInternalColor.value.copy(colors.ringInternal);
  material.uniforms.uLightColor.value.copy(colors.accent);
  material.uniforms.uTheme.value = themeValue;
  material.uniforms.uProcessingIntensity.value = theme === 'dark' ? 1.2 : 1.0;
  material.needsUpdate = true;
};

const VesselShaders = {
  createVesselShaderMaterial,
  getVesselThemeColors,
  updateVesselTheme,
  vesselVertexShader,
  vesselFragmentShader,
};

export default VesselShaders;

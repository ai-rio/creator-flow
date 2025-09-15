/**
 * Particle Shader Materials - CreatorFlow Three.js Integration
 *
 * Advanced particle processing shaders for the multi-stage flow system.
 * Features star-shaped particles with dynamic colors and enhanced sparkle effects.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

import * as THREE from 'three';

export interface ParticleShaderUniforms {
  [uniform: string]: THREE.IUniform<any>;
  uTime: { value: number };
  uSize: { value: number };
  uCorePosition: { value: THREE.Vector3 };
  uMouse: { value: THREE.Vector2 };
  uColorAccent: { value: THREE.Color };
  uColorSuccess: { value: THREE.Color };
  uColorWarning: { value: THREE.Color };
  uColorDanger: { value: THREE.Color };
  uTheme: { value: number };
}

export const particleVertexShader = `
  uniform float uTime, uSize;
  uniform vec3 uCorePosition;
  uniform vec2 uMouse;
  attribute float progress;
  varying vec3 vColor;
  varying float vIntensity;
  varying float vIsSuccess;
  uniform vec3 uColorAccent, uColorSuccess, uColorWarning, uColorDanger;

  void main() {
    float currentProgress = fract(progress + uTime * 0.055); // VESSEL PROCESSING SPEED - optimal for biological flow
    vec3 pos = position;
    vec3 finalPos;
    vec3 baseColor;
    float intensity = 1.0;
    float isSuccess = 0.0;

    if (currentProgress < 0.4) {
      // CHAOTIC PACKAGES APPROACHING VESSEL - flowing toward ring from all directions
      float approachProgress = currentProgress / 0.4;
      float particleID = fract(position.x * 0.1 + position.y * 0.1 + position.z * 0.1);

      // CHAOTIC ENTRY PATTERNS - packages arrive from distant chaos
      float chaosTime = uTime * 0.8 + particleID * 6.28;
      vec3 chaoticMovement = vec3(
        sin(position.x * 2.5 + chaosTime) * 1.2,
        cos(position.y * 2.8 + chaosTime) * 1.2,
        sin(position.z * 2.2 + chaosTime) * 0.8
      ) * (1.0 - approachProgress) * 1.5;

      // VESSEL MAGNETISM - Ring pulls packages toward entry points
      vec3 toVesselDirection = normalize(uCorePosition - pos);
      float vesselAttraction = smoothstep(0.1, 0.9, approachProgress);

      // MULTIPLE ENTRY POINTS around the vessel ring
      float entryAngle = particleID * 6.28; // Each particle gets unique entry angle
      vec3 vesselEntryPoint = uCorePosition + vec3(
        cos(entryAngle) * 3.15,
        sin(entryAngle) * 3.15,
        sin(entryAngle * 2.0) * 1.5
      );

      vec3 toEntryDirection = normalize(vesselEntryPoint - pos);
      vec3 vesselPull = toEntryDirection * vesselAttraction * 8.0;

      finalPos = pos + chaoticMovement + vesselPull * approachProgress;

      // CHAOTIC PACKAGE COLORS - orange/red unorganized data
      float colorNoise = fract(sin(particleID * 43.7) * 127.5);
      baseColor = mix(uColorDanger, uColorWarning, colorNoise);

      intensity = 1.0 + sin(chaosTime * 1.5) * 0.3; // Chaotic flickering
    } else if (currentProgress < 0.7) {
      // PROCESSING WITHIN VESSEL - packages being transformed inside the ring
      float processingProgress = (currentProgress - 0.4) / 0.3;
      float particleID = fract(position.x * 0.1 + position.y * 0.1 + position.z * 0.1);

      // INTERNAL VESSEL FLOW PATTERNS - complex processing within ring structure
      float processingTime = uTime * 1.2 + particleID * 6.28;
      float spiralAngle = processingProgress * 4.0 + processingTime * 0.5;

      // VESSEL INTERNAL GEOMETRY - packets flow through vessel channels
      float vesselRadius = 2.85 + sin(processingTime * 0.8) * 0.225; // Vessel breathing
      float spiralRadius = mix(3.15, 2.25, processingProgress); // Spiral inward during processing

      // COMPLEX INTERNAL PROCESSING PATHS
      vec3 spiralPath = vec3(
        cos(spiralAngle) * spiralRadius,
        sin(spiralAngle) * spiralRadius,
        sin(spiralAngle * 1.5 + processingTime) * 1.8 // Complex Z movement
      );

      // VESSEL WALL INTERACTION - packets follow vessel internal structure
      float wallProximity = sin(spiralAngle * 3.0 + processingTime * 0.6) * 0.4;
      spiralPath += normalize(spiralPath) * wallProximity;

      finalPos = uCorePosition + spiralPath;

      // TRANSFORMATION COLORS - gradual change from chaos to organization
      float transformProgress = smoothstep(0.0, 1.0, processingProgress);
      vec3 chaosColor = mix(uColorDanger, uColorWarning, fract(particleID * 7.3));
      vec3 organizingColor = mix(uColorWarning, uColorAccent, transformProgress);
      baseColor = mix(chaosColor, organizingColor, transformProgress * 0.9);

      // PROCESSING INTENSITY - active transformation within vessel
      intensity = 1.2 + sin(processingTime * 2.0) * 0.25; // Active processing energy
    } else {
      // ORGANIZED DELIVERY FROM VESSEL - systematic output
      float deliveryProgress = (currentProgress - 0.7) / 0.3;
      float particleID = fract(position.x * 0.1 + position.y * 0.1 + position.z * 0.1);

      // VESSEL EXIT POINTS - organized departure from processing ring
      float exitAngle = particleID * 6.28 + uTime * 0.2; // Systematic rotation
      vec3 vesselExitPoint = uCorePosition + vec3(
        cos(exitAngle) * 2.625,
        sin(exitAngle) * 2.625,
        cos(exitAngle * 1.8) * 1.2
      );

      // ORGANIZED DELIVERY STREAMS - systematic distribution
      vec3 deliveryDirection = normalize(vec3(
        sin(exitAngle + particleID * 2.0) * 0.4,
        cos(exitAngle + particleID * 1.5) * 0.6,
        sin(exitAngle * 2.5) * 0.3
      ));

      // SMOOTH SYSTEMATIC FLOW out from vessel
      vec3 deliveryPath = vesselExitPoint + deliveryDirection * deliveryProgress * 15.0;
      finalPos = mix(vesselExitPoint, deliveryPath, smoothstep(0.0, 1.0, deliveryProgress));

      // ORGANIZED SUCCESS COLORS - clean green processed packages
      baseColor = uColorSuccess;

      // CONFIDENT DELIVERY - stable successful output
      intensity = 1.0 + sin(uTime * 1.0 + exitAngle * 3.0) * 0.1;
      isSuccess = 1.0; // Mark as successfully processed
    }

    vColor = baseColor;
    vIntensity = intensity;
    vIsSuccess = isSuccess;

    vec4 modelViewPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;

    // PROFESSIONAL particle sizing - clean hierarchy
    float particleSize = uSize;
    if (isSuccess > 0.5) {
      // Clean success particles - minimal animation for professionalism
      particleSize *= 1.3 + sin(uTime * 1.0 + position.y * 3.0) * 0.1; // Much calmer
    }
    gl_PointSize = particleSize / -modelViewPosition.z;
  }
`;

export const particleFragmentShader = `
  uniform float uTheme;
  uniform float uTime;
  varying vec3 vColor;
  varying float vIntensity;
  varying float vIsSuccess;

  // Function to create a spiky star shape using distance fields
  float starShape(vec2 uv, float spikes, float outerRadius, float innerRadius) {
    vec2 center = vec2(0.5);
    vec2 p = uv - center;
    float angle = atan(p.y, p.x);
    float radius = length(p);

    // Create spikes using sine wave modulation
    float spikeAngle = 2.0 * 3.14159 / spikes;
    float modAngle = mod(angle + 3.14159, spikeAngle) - spikeAngle * 0.5;
    float spikeRadius = mix(innerRadius, outerRadius, 0.5 + 0.5 * cos(modAngle * spikes));

    // Create sharp falloff for defined edges
    float distanceFromEdge = spikeRadius - radius;
    return smoothstep(-0.02, 0.02, distanceFromEdge);
  }

  void main() {
    vec2 center = vec2(0.5);
    float coreDistance = distance(gl_PointCoord, center);

    // Enhanced star shape for success particles
    float spikes = 6.0;
    float outerRadius = 0.45;
    float innerRadius = 0.15;

    // Success particles get enhanced star shape but REDUCED size
    if (vIsSuccess > 0.5) {
      spikes = 8.0; // More spikes for success particles
      outerRadius = 0.38; // REDUCED (was 0.48, now 0.38 = 21% smaller)
      innerRadius = 0.15; // INCREASED inner radius for less aggressive spikes
    }

    float starMask = starShape(gl_PointCoord, spikes, outerRadius, innerRadius);

    // REDUCED glow core for success particles
    float coreGlow = 1.0 - smoothstep(0.0, 0.25, coreDistance);
    if (vIsSuccess > 0.5) {
      // REDUCED core glow for green particles (was 0.35, now 0.28)
      coreGlow = 1.0 - smoothstep(0.0, 0.28, coreDistance);
      coreGlow = pow(coreGlow, 0.8); // Less aggressive glow (was 0.6, now 0.8)
    }

    // Combine star shape with core glow
    float combinedShape = max(starMask, coreGlow * 0.7);

    // MINIMAL sparkle for professional appearance
    float sparkle = 1.0 + 0.15 * sin(gl_PointCoord.x * 12.0) * sin(gl_PointCoord.y * 12.0); // Much less sparkle
    // PROGRESSIVE sparkle enhancement during transformation
    if (vIsSuccess > 0.1) {
      float successIntensity = clamp(vIsSuccess, 0.0, 1.0);
      float sparkleAmount = mix(0.05, 0.12, successIntensity);
      float timeSparkle = 1.0 + sparkleAmount * sin(uTime * 3.0 + gl_PointCoord.x * 15.0) * cos(uTime * 2.0 + gl_PointCoord.y * 12.0);
      sparkle = max(sparkle, timeSparkle);

      // PROGRESSIVE radial glow - grows with success
      float radialGlow = 1.0 - smoothstep(0.0, 0.4, coreDistance);
      float glowIntensity = mix(0.05, 0.15, successIntensity);
      radialGlow *= glowIntensity * (1.0 + sin(uTime * 1.5) * 0.1);
      combinedShape = max(combinedShape, radialGlow);
    }

    combinedShape *= sparkle;

    // Enhanced opacity for both themes - maintain particle sparkle
    float opacity = mix(
      combinedShape * 0.9,  // Light theme: boosted for visibility
      combinedShape * 0.8,  // Dark theme: original brilliance
      uTheme
    );

    // REDUCED brightness boost for success particles
    if (vIsSuccess > 0.5) {
      opacity *= 1.0; // REMOVED extra brightness (was 1.3, now 1.0)
    }

    float finalOpacity = opacity * vIntensity;

    // PROFESSIONAL color treatment - clean and authoritative
    vec3 finalColor = vColor;
    if (vIsSuccess > 0.5) {
      // MINIMAL glow - confident but not flashy
      finalColor = vColor * (1.0 + 0.08 * sin(uTime * 2.0)); // Very subtle animation
      // SUBTLE white core - professional highlight
      finalColor = mix(finalColor, vec3(0.95, 1.0, 0.95), coreGlow * 0.08); // Much more subtle
    }

    gl_FragColor = vec4(finalColor, finalOpacity);
  }
`;

/**
 * Creates particle shader material with optimized uniforms
 */
export const createParticleShaderMaterial = (uniforms: ParticleShaderUniforms): THREE.ShaderMaterial => {
  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
  });
};

/**
 * Creates particle geometry with progress attributes
 */
export const createParticleGeometry = (particleCount: number): THREE.BufferGeometry => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const progressData = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    // VESSEL-CENTRIC DISTRIBUTION - packages start from wider chaos field
    positions[i * 3] = (Math.random() - 0.5) * 40; // Wider initial distribution
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // More Z-depth for 3D vessel flow
    progressData[i] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('progress', new THREE.BufferAttribute(progressData, 1));

  return geometry;
};

/**
 * Updates particle material colors for theme changes
 */
export const updateParticleTheme = (material: THREE.ShaderMaterial, colors: any, theme: 'light' | 'dark'): void => {
  const themeValue = theme === 'dark' ? 1.0 : 0.0;

  material.uniforms.uColorAccent.value.copy(colors.accent);
  material.uniforms.uColorSuccess.value.copy(colors.success);
  material.uniforms.uColorWarning.value.copy(colors.warning);
  material.uniforms.uColorDanger.value.copy(colors.danger);
  material.uniforms.uTheme.value = themeValue;

  // Update blending modes for optimal visibility
  material.blending = THREE.AdditiveBlending; // Keep additive for both themes
  material.needsUpdate = true;
};

const ParticleShaders = {
  createParticleShaderMaterial,
  createParticleGeometry,
  updateParticleTheme,
  particleVertexShader,
  particleFragmentShader,
};

export default ParticleShaders;

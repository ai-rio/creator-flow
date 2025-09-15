/**
 * Aortic Vessel Animation System - CreatorFlow Three.js Integration
 *
 * Core animation logic for the sophisticated vessel processing system.
 * Manages scene setup, animation loops, and performance optimizations.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

import * as THREE from 'three';

import {
  createEnergyCoreShaderMaterial,
  type EnergyCoreShaderUniforms,
  updateEnergyCoreTheme,
} from '../shaders/energyShaders';
import {
  createParticleGeometry,
  createParticleShaderMaterial,
  type ParticleShaderUniforms,
  updateParticleTheme,
} from '../shaders/particleShaders';
import {
  createVesselShaderMaterial,
  getVesselThemeColors,
  updateVesselTheme,
  type VesselShaderUniforms,
} from '../shaders/vesselShaders';

export interface AorticVesselConfig {
  theme: 'light' | 'dark';
  particleCount?: number;
  cameraDistance?: number;
  performanceMode?: 'high' | 'medium' | 'low';
}

export interface AorticVesselInstance {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  handleThemeChange: (theme: 'light' | 'dark') => void;
  handleMouseMove: (x: number, y: number) => void;
  dispose: () => void;
}

/**
 * Creates and initializes the Aortic Vessel animation system
 */
export const createAorticVesselAnimation = (
  container: HTMLDivElement,
  config: AorticVesselConfig
): AorticVesselInstance => {
  const { theme, particleCount = 900, cameraDistance = 18, performanceMode = 'high' } = config;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = cameraDistance;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, performanceMode === 'high' ? 2 : 1));
  container.appendChild(renderer.domElement);

  // Core position for vessel system
  const corePosition = new THREE.Vector3(7, 2.5, 0);

  // Get initial colors
  const currentColors = getVesselThemeColors(theme === 'dark');

  // Create vessel (Aortic Ring)
  const ringGeometry = new THREE.TorusKnotGeometry(2.85, 0.9, 320, 48);
  const vesselUniforms: VesselShaderUniforms = {
    uTime: { value: 0 },
    uColor: { value: currentColors.ring.clone() },
    uInternalColor: { value: currentColors.ringInternal.clone() },
    uProcessingIntensity: { value: 1.0 },
    uCorePosition: { value: corePosition.clone() },
    uLightColor: { value: currentColors.accent.clone() },
    uTheme: { value: theme === 'dark' ? 1.0 : 0.0 },
  };
  const vesselMaterial = createVesselShaderMaterial(vesselUniforms);
  const aorticRing = new THREE.Mesh(ringGeometry, vesselMaterial);
  aorticRing.position.copy(corePosition);
  scene.add(aorticRing);

  // Create energy core (minimized)
  const energyGeometry = new THREE.SphereGeometry(0.8, 32, 32);
  const energyUniforms: EnergyCoreShaderUniforms = {
    uTime: { value: 0 },
    uColor1: { value: currentColors.accent.clone() },
    uColor2: { value: currentColors.accent2.clone() },
    uColor3: { value: currentColors.accent3.clone() },
    uColor4: { value: currentColors.accent4.clone() },
    uTheme: { value: theme === 'dark' ? 1.0 : 0.0 },
    uCorePosition: { value: corePosition.clone() },
  };
  const energyMaterial = createEnergyCoreShaderMaterial(energyUniforms);
  const livingCore = new THREE.Mesh(energyGeometry, energyMaterial);
  livingCore.position.copy(corePosition);
  scene.add(livingCore);

  // Create processing particles
  const packetGeometry = createParticleGeometry(particleCount);
  const particleUniforms: ParticleShaderUniforms = {
    uTime: { value: 0 },
    uSize: { value: 60.0 * renderer.getPixelRatio() },
    uCorePosition: { value: corePosition.clone() },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorAccent: { value: currentColors.accent.clone() },
    uColorSuccess: { value: currentColors.success.clone() },
    uColorWarning: { value: currentColors.warning.clone() },
    uColorDanger: { value: currentColors.danger.clone() },
    uTheme: { value: theme === 'dark' ? 1.0 : 0.0 },
  };
  const packetMaterial = createParticleShaderMaterial(particleUniforms);
  const packets = new THREE.Points(packetGeometry, packetMaterial);
  scene.add(packets);

  // Lighting setup
  const ambientLight = new THREE.AmbientLight(0x404040, theme === 'dark' ? 0.15 : 0.25);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x6d28d9, theme === 'dark' ? 0.3 : 0.4);
  directionalLight.position.set(8, 6, 8);
  scene.add(directionalLight);

  const vesselLight = new THREE.PointLight(currentColors.ringInternal.getHex(), 0.8, 12);
  vesselLight.position.copy(corePosition);
  scene.add(vesselLight);

  // Mouse interaction
  const mouse = new THREE.Vector2();
  const targetMouse = new THREE.Vector2();

  // Animation loop
  const clock = new THREE.Clock();
  let animationFrame: number;

  const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update time uniforms
    vesselMaterial.uniforms.uTime.value = elapsedTime;
    energyMaterial.uniforms.uTime.value = elapsedTime;
    packetMaterial.uniforms.uTime.value = elapsedTime;

    // Vessel processing rotations - Enhanced for biological movement
    aorticRing.rotation.x = elapsedTime * 0.08 + Math.sin(elapsedTime * 0.5) * 0.02;
    aorticRing.rotation.y = elapsedTime * 0.12 + Math.cos(elapsedTime * 0.7) * 0.03;
    aorticRing.rotation.z = Math.sin(elapsedTime * 0.3) * 0.05;

    // Mouse interaction
    mouse.lerp(targetMouse, 0.02);
    camera.position.x = corePosition.x + mouse.x * 2.0;
    camera.position.y = corePosition.y + mouse.y * 2.0;
    camera.lookAt(corePosition);
    packetMaterial.uniforms.uMouse.value.copy(mouse);

    renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(animate);
  };

  animate();

  // Handle resize
  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, performanceMode === 'high' ? 2 : 1));
  };

  // Theme change handler
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    const newColors = getVesselThemeColors(newTheme === 'dark');

    // Update vessel
    updateVesselTheme(vesselMaterial, newTheme);

    // Update energy core
    updateEnergyCoreTheme(energyMaterial, newColors, corePosition, newTheme);

    // Update particles
    updateParticleTheme(packetMaterial, newColors, newTheme);

    // Update lighting
    const isDark = newTheme === 'dark';
    ambientLight.intensity = isDark ? 0.15 : 0.25;
    directionalLight.intensity = isDark ? 0.3 : 0.4;
    vesselLight.color.copy(newColors.ringInternal);
  };

  // Mouse move handler
  const handleMouseMove = (x: number, y: number) => {
    const rect = container.getBoundingClientRect();
    targetMouse.x = ((x - rect.left) / rect.width) * 2 - 1;
    targetMouse.y = -((y - rect.top) / rect.height) * 2 + 1;
  };

  // Disposal cleanup
  const dispose = () => {
    cancelAnimationFrame(animationFrame);

    // Dispose geometries
    ringGeometry.dispose();
    energyGeometry.dispose();
    packetGeometry.dispose();

    // Dispose materials
    vesselMaterial.dispose();
    energyMaterial.dispose();
    packetMaterial.dispose();

    // Remove objects from scene
    scene.remove(ambientLight);
    scene.remove(directionalLight);
    scene.remove(vesselLight);
    scene.remove(aorticRing);
    scene.remove(livingCore);
    scene.remove(packets);

    // Dispose renderer
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    renderer.dispose();
  };

  return {
    scene,
    camera,
    renderer,
    handleThemeChange,
    handleMouseMove,
    dispose,
  };
};

/**
 * Performance optimization utilities
 */
export const getOptimalParticleCount = (deviceType: 'mobile' | 'tablet' | 'desktop'): number => {
  switch (deviceType) {
    case 'mobile':
      return 300;
    case 'tablet':
      return 600;
    case 'desktop':
    default:
      return 900;
  }
};

export const detectDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const AorticVesselUtils = {
  createAorticVesselAnimation,
  getOptimalParticleCount,
  detectDeviceType,
};

export default AorticVesselUtils;

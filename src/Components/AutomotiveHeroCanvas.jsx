import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

export default function AutomotiveHeroCanvas() {
  const mountRef = useRef(null);
  const { isDark } = useTheme();
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // WebGL Renderer setup
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not available for hero canvas", e);
      setWebglSupported(false);
      setIsLoaded(true);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Atmospheric Fog for deep cinematic negative space
    const fogColor = isDark ? 0x080d16 : 0xf1f5f7;
    scene.fog = new THREE.FogExp2(fogColor, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    camera.position.set(0, 1.2, 10);
    camera.lookAt(0, 0, -4);

    // =========================================================
    // 1. SUBTLE AUTOMOTIVE GPS ROUTE CURVES (NO 3D GRID FLOOR)
    // =========================================================
    // Elegant sweeping highway curves in 3D space
    const curves = [
      // Primary Panoramic Highway Spline (sweeping from lower-left to upper-right horizon)
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-14, -1.8, -12),
        new THREE.Vector3(-7, -0.9, -6),
        new THREE.Vector3(0, -0.4, 0),
        new THREE.Vector3(6, 0.2, -8),
        new THREE.Vector3(12, 1.1, -18),
      ]),
      // Secondary Intercity Corridor Curve
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-12, 1.2, -18),
        new THREE.Vector3(-5, 0.3, -10),
        new THREE.Vector3(2, -0.3, -2),
        new THREE.Vector3(8, -1.1, 4),
      ]),
    ];

    const routeMaterials = [];
    const routeMeshes = [];

    curves.forEach((curve, index) => {
      const points = curve.getPoints(120);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const color = isDark
        ? index === 0
          ? 0x70b6d0
          : 0x326071
        : index === 0
        ? 0x326071
        : 0x486f7e;

      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: isDark ? (index === 0 ? 0.24 : 0.14) : index === 0 ? 0.32 : 0.22,
        linewidth: 1,
      });

      const line = new THREE.Line(geometry, material);
      scene.add(line);
      routeMeshes.push(line);
      routeMaterials.push(material);
    });

    // =========================================================
    // 2. MINIMAL GPS NAVIGATION NODE MARKERS
    // =========================================================
    // Location points representing mobility hubs along route
    const nodeCoords = [
      new THREE.Vector3(-7, -0.9, -6),
      new THREE.Vector3(0, -0.4, 0),
      new THREE.Vector3(6, 0.2, -8),
      new THREE.Vector3(2, -0.3, -2),
    ];

    const nodeMeshes = [];
    const nodeRingGeo = new THREE.RingGeometry(0.12, 0.18, 24);
    const nodeDotGeo = new THREE.CircleGeometry(0.06, 16);

    nodeCoords.forEach((pos, idx) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pos);

      const ringMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0x70b6d0 : 0x326071,
        transparent: true,
        opacity: isDark ? 0.35 : 0.3,
        side: THREE.DoubleSide,
      });

      const dotMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0xe8f0f7 : 0x101820,
        transparent: true,
        opacity: isDark ? 0.5 : 0.42,
        side: THREE.DoubleSide,
      });

      const ring = new THREE.Mesh(nodeRingGeo, ringMat);
      const dot = new THREE.Mesh(nodeDotGeo, dotMat);
      ring.rotation.x = -Math.PI / 2;
      dot.rotation.x = -Math.PI / 2;

      nodeGroup.add(ring);
      nodeGroup.add(dot);
      scene.add(nodeGroup);
      nodeMeshes.push({ group: nodeGroup, ringMat, baseScale: 1, offset: idx * 1.5 });
    });

    // =========================================================
    // 3. TINY SUBTLE PARTICLES (VERY LOW COUNT & SOFT OPACITY)
    // =========================================================
    const particleCount = 38;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 26;
      particlePositions[i + 1] = Math.random() * 8 - 3;
      particlePositions[i + 2] = (Math.random() - 0.5) * 24 - 4;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0x70b6d0 : 0x486f7e,
      size: 0.04,
      transparent: true,
      opacity: isDark ? 0.28 : 0.22,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // =========================================================
    // 4. MOUSE PARALLAX TRACKING (SMOOTH LERP DEPTH)
    // =========================================================
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.35;
      targetY = y * 0.2;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // =========================================================
    // 5. ANIMATION LOOP (SLOW, SMOOTH, CINEMATIC)
    // =========================================================
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth mouse camera interpolation (no shaking)
      if (!prefersReducedMotion) {
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (1.2 + targetY - camera.position.y) * 0.03;
      }
      camera.lookAt(0, 0, -4);

      // Subtle slow pulse of GPS navigation node markers
      nodeMeshes.forEach((node) => {
        const pulse = 1 + Math.sin(elapsed * 1.5 + node.offset) * 0.15;
        node.group.scale.set(pulse, pulse, pulse);
        node.ringMat.opacity = isDark
          ? 0.25 + Math.sin(elapsed * 1.5 + node.offset) * 0.15
          : 0.15 + Math.sin(elapsed * 1.5 + node.offset) * 0.08;
      });

      // Very slow particles drift
      if (!prefersReducedMotion) {
        particles.rotation.y = elapsed * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      routeMeshes.forEach((mesh) => mesh.geometry.dispose());
      routeMaterials.forEach((mat) => mat.dispose());
      nodeRingGeo.dispose();
      nodeDotGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isDark]);

  // Mark as loaded when component mounts and WebGL check is complete
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null; // Don't render until loaded
  }

  if (!webglSupported) {
    return null; // Silently fall back if WebGL is not available
  }

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        opacity: isDark ? 0.95 : 0.85,
        transition: "opacity 0.4s ease",
      }}
      aria-hidden="true"
    />
  );
}

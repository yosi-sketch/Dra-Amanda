"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

interface LadyJusticeCanvasProps {
  scrollProgress: number; // 0 (Hero) to 1 (Second Fold)
}

/**
 * Creates high-detail procedural texture maps for dark aged bronze
 * with subtle greenish-blue verdigris oxidation and micro-cast metal grain.
 */
function createBronzeTextures() {
  if (typeof document === "undefined") return { map: null, roughnessMap: null };

  // 1. Color / Diffuse Map (1024x1024)
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { map: null, roughnessMap: null };

  // Base dark antique bronze tone with richer warmth
  ctx.fillStyle = "#322217";
  ctx.fillRect(0, 0, 1024, 1024);

  // Layer 1: Metal grain, subtle cast variations and warm bronze highlights
  for (let i = 0; i < 480; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const r = Math.random() * 85 + 20;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    if (Math.random() > 0.42) {
      grad.addColorStop(0, "rgba(125, 86, 56, 0.38)"); // Luminous warm bronze highlight
      grad.addColorStop(1, "rgba(50, 34, 23, 0)");
    } else {
      grad.addColorStop(0, "rgba(24, 16, 11, 0.42)");  // Deep oxidized shadow
      grad.addColorStop(1, "rgba(50, 34, 23, 0)");
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Layer 2: Fine greenish-blue verdigris oxidation flecks and patina veins
  for (let i = 0; i < 700; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const size = Math.random() * 32 + 5;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
    const alpha = Math.random() * 0.40 + 0.15;
    // Greenish-blue verdigris patina tones (cyan-emerald oxidation)
    grad.addColorStop(0, `rgba(42, 138, 116, ${alpha})`);
    grad.addColorStop(0.6, `rgba(26, 88, 72, ${alpha * 0.65})`);
    grad.addColorStop(1, "rgba(20, 56, 46, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Layer 3: Micro-noise for cast bronze texture
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.9));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.75));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  // 2. Roughness Map (512x512) - Controlled semi-gloss roughness
  const rCanvas = document.createElement("canvas");
  rCanvas.width = 512;
  rCanvas.height = 512;
  const rCtx = rCanvas.getContext("2d");
  if (rCtx) {
    // Base roughness approx 0.38 - 0.40 for defined contours and controlled specular
    rCtx.fillStyle = "#606060";
    rCtx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 220; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 35 + 10;
      rCtx.fillStyle = "rgba(145, 145, 145, 0.28)"; // Matte oxidation specks
      rCtx.beginPath();
      rCtx.arc(x, y, r, 0, Math.PI * 2);
      rCtx.fill();
    }
  }
  const roughnessTexture = new THREE.CanvasTexture(rCanvas);
  roughnessTexture.wrapS = THREE.RepeatWrapping;
  roughnessTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.repeat.set(4, 4);

  return { map: texture, roughnessMap: roughnessTexture };
}

interface LadyJusticeCanvasProps {
  scrollProgress: number; // 0 (Hero) to 1 (Second Fold)
  exitOffset?: number;    // translateY offset when leaving Filosofia towards Corpo Diretivo
  opacity?: number;       // Opacity fading to 0 as Corpo Diretivo enters
}

export default function LadyJusticeCanvas({
  scrollProgress,
  exitOffset = 0,
  opacity = 1,
}: LadyJusticeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera - Positioned for full-body framing with comfortable headroom and base clearance
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(36, aspect, 0.1, 100);
    if (aspect < 1) {
      // Mobile: camera distance adjusted for monumental and balanced framing without distortion
      camera.position.set(0, 0.0, 4.35);
    } else {
      camera.position.set(0, 0.0, 4.4);
    }

    // 3. Renderer with ACES Tone Mapping for Metallic Specular Fidelity
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.62;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment Map for Photorealistic Metallic Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(envScene).texture;
    scene.environment = envMap;
    pmremGenerator.dispose();

    // 5. Studio Lighting Setup with Increased Ambient Studio Intensity
    // Soft Ambient Studio Light - Illuminates whole scene and sculpture naturally
    const ambientStudioLight = new THREE.AmbientLight(0xdde8e2, 1.8);
    scene.add(ambientStudioLight);

    // Warm Key Light - Highlights metallic curves, drapery folds and scales
    const warmKeyLight = new THREE.DirectionalLight(0xfff2e3, 4.8);
    warmKeyLight.position.set(3.2, 4.5, 3.5);
    warmKeyLight.castShadow = true;
    scene.add(warmKeyLight);

    // Overhead Sculptural Rim
    const overheadRim = new THREE.DirectionalLight(0xffe8cf, 3.0);
    overheadRim.position.set(-1.8, 5.0, 1.4);
    scene.add(overheadRim);

    // Fill Light - Soft cool balance to delineate volume
    const fillLight = new THREE.DirectionalLight(0xcde1ed, 2.4);
    fillLight.position.set(-3.5, 2.0, 2.5);
    scene.add(fillLight);

    // DEDICATED EXECUTIVE BLUE (#2563eb) RIM LIGHT - Suave e aristocrático
    const sapphireRimLight = new THREE.PointLight(0x2563eb, 4.5, 8.5);
    sapphireRimLight.position.set(1.4, 1.4, -1.2);
    scene.add(sapphireRimLight);

    // Dedicated Executive Blue Directional Silhouette Light from behind
    const blueSilhouetteLight = new THREE.DirectionalLight(0x1d4ed8, 2.2);
    blueSilhouetteLight.position.set(-0.8, 2.6, -4.0);
    scene.add(blueSilhouetteLight);

    // Subtle Blue Back-Halo behind torso to separate from dark background
    const blueBackHalo = new THREE.PointLight(0x38bdf8, 2.5, 6.0);
    blueBackHalo.position.set(0, 0.3, -0.9);
    scene.add(blueBackHalo);

    // Warm Bronze Accent Rim Light (Amber opposing glint)
    const warmRimLight = new THREE.PointLight(0xeca44b, 4.8, 8.5);
    warmRimLight.position.set(-1.8, 1.8, -1.6);
    scene.add(warmRimLight);

    // 6. Model Container
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 7. Load Model & Apply Dark Aged Bronze with Full-Body Scaling (No pedestal)
    const { map, roughnessMap } = createBronzeTextures();
    const loader = new GLTFLoader();
    const modelUrl = "/Model-3D/Lady Justice.glb";

    loader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;

        // Auto-center and normalize scale for FULL-BODY framing
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Desired full statue height: perfectly fits inside viewport with comfortable margins
        const desiredHeight = 2.22;
        const scale = desiredHeight / size.y;
        root.scale.setScalar(scale);

        // Center the statue precisely at origin (0, 0, 0)
        root.position.x = -center.x * scale;
        root.position.y = -center.y * scale;
        root.position.z = -center.z * scale;

        // Apply Photorealistic Dark Aged Bronze Material with Defined Contours
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const bronzeMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#63452f"), // Rich warm antique bronze tone
              metalness: 0.86,                   // Controlled metallic intensity
              roughness: 0.36,                   // Defined specular contours
              map: map || undefined,
              roughnessMap: roughnessMap || undefined,
              envMapIntensity: 3.0,              // Rich studio reflections
            });

            mesh.material = bronzeMaterial;
          }
        });

        modelGroup.add(root);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(percent);
        }
      },
      (error) => {
        console.error("Error loading Lady Justice 3D model:", error);
        setLoading(false);
      }
    );

    // Initial positioning variables for full-body Hero view
    let currentX = 0;
    let currentY = -0.04;
    let currentRotY = 0.04;
    let currentRotX = 0.01;
    let currentScale = 1.0;

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      const newAspect = newWidth / newHeight;
      camera.aspect = newAspect;
      if (newAspect < 1) {
        camera.position.set(0, 0.0, 4.35);
      } else {
        camera.position.set(0, 0.0, 4.4);
      }
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Mouse subtle parallax for desktop
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Touch subtle interaction for mobile
    let touchX = 0;
    let touchY = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const dx = (e.touches[0].clientX - touchStartX) / (window.innerWidth || 1);
        const dy = (e.touches[0].clientY - touchStartY) / (window.innerHeight || 1);
        touchX = Math.max(-1, Math.min(1, dx * 2.5));
        touchY = Math.max(-1, Math.min(1, dy * 2.5));
      }
    };
    const handleTouchEnd = () => {
      touchX = 0;
      touchY = 0;
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // 9. Render Loop with Smooth Scroll Interpolation & Cinematic Upper-Half Zoom Dive
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      const p = scrollRef.current; // 0 = Hero, 1 = Second Fold

      const isMobile = window.innerWidth < 1024;

      // Target Positions based on scroll progress:
      // Hero (p=0): Centered with pristine prominence on mobile and desktop
      // Second fold (p=1): Moves smoothly to show profile and scales
      const targetX = isMobile
        ? THREE.MathUtils.lerp(0.0, 0.22, p)
        : THREE.MathUtils.lerp(0.0, 0.92, p);

      // Vertical framing:
      // Hero (p=0): On mobile: -0.28 (perfect balance right below headlines/buttons, majestic full torso, scales and sword)
      // Second fold (p=1): Shifts slightly to -0.16 to frame noble bust and glistening balance scales
      // Desktop: -0.04 to -0.78
      const targetY = isMobile
        ? THREE.MathUtils.lerp(-0.28, -0.16, p)
        : THREE.MathUtils.lerp(-0.04, -0.78, p);

      // Scale:
      // On mobile: 1.10 in Hero, scaling up to 1.35 in fold 2 for an impressive cinematic closeup
      // On desktop: 1.0 scaling up to 1.78
      const targetScale = isMobile
        ? THREE.MathUtils.lerp(1.10, 1.35, p)
        : THREE.MathUtils.lerp(1.0, 1.78, p);

      // Interactive subtle parallax (desktop mouse or mobile touch)
      const inputX = isMobile ? touchX : mouseX;
      const inputY = isMobile ? touchY : mouseY;

      // Target Rotation:
      // In Hero: Front-facing with slight authority angle (0.04 rad)
      // In Fold 2: Turns smoothly to profile (-0.38 rad mobile, -0.70 rad desktop)
      const targetRotY =
        (isMobile
          ? THREE.MathUtils.lerp(0.04, -0.38, p)
          : THREE.MathUtils.lerp(0.04, -0.70, p)) +
        inputX * (isMobile ? 0.05 : 0.035);

      const targetRotX =
        (isMobile
          ? THREE.MathUtils.lerp(0.01, 0.02, p)
          : THREE.MathUtils.lerp(0.01, 0.03, p)) -
        inputY * 0.02;

      // Subtle breathing floating motion
      const breathing = Math.sin(elapsedTime * 1.5) * 0.008;

      // Smooth Lerping
      currentX = THREE.MathUtils.lerp(currentX, targetX, 0.06);
      currentY = THREE.MathUtils.lerp(currentY, targetY + breathing, 0.06);
      currentScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.06);
      currentRotY = THREE.MathUtils.lerp(currentRotY, targetRotY, 0.06);
      currentRotX = THREE.MathUtils.lerp(currentRotX, targetRotX, 0.06);

      modelGroup.position.set(currentX, currentY, 0);
      modelGroup.rotation.set(currentRotX, currentRotY, 0);
      modelGroup.scale.setScalar(currentScale);

      // Keep rim lights synchronized with model movement
      sapphireRimLight.position.x = currentX + (isMobile ? 0.8 : 1.2);
      sapphireRimLight.position.y = currentY + 1.2;
      warmRimLight.position.x = currentX - (isMobile ? 0.9 : 1.4);
      warmRimLight.position.y = currentY + 1.4;
      blueBackHalo.position.x = currentX;
      blueBackHalo.position.y = currentY + 0.3;
      blueSilhouetteLight.position.x = currentX - 0.7;
      blueSilhouetteLight.position.y = currentY + 1.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none z-10 overflow-hidden will-change-transform"
      style={{
        transform: exitOffset > 0 ? `translate3d(0, -${exitOffset}px, 0)` : "none",
        opacity: opacity,
        display: opacity === 0 ? "none" : "block",
      }}
    >
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Sleek Minimal Loading Indicator */}
      {loading && (
        <div className="absolute bottom-10 right-10 flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 border border-[#286641]/40 backdrop-blur-md transition-opacity duration-500 animate-pulse">
          <div className="w-3.5 h-3.5 border-2 border-[#286641] border-t-transparent rounded-full animate-spin" />
          <span className="text-[11px] font-medium tracking-wider text-zinc-300 uppercase">
            Carregando Lady Justice 3D {loadProgress > 0 ? `${loadProgress}%` : "..."}
          </span>
        </div>
      )}
    </div>
  );
}

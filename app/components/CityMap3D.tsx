"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CityMap3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a2744);
    scene.fog = new THREE.Fog(0x1a2744, 100, 500);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 30, 50);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Ground/Terrain
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x2a3f5f });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Districts with buildings
    const districts = [
      { name: "Victoria Island", x: -40, z: -40, color: 0xff6b6b },
      { name: "Lekki", x: 40, z: -40, color: 0x4ecdc4 },
      { name: "Ikoyi", x: 0, z: 0, color: 0xffe66d },
      { name: "Yaba", x: -40, z: 40, color: 0x95e1d3 },
      { name: "Surulere", x: 40, z: 40, color: 0xc7ceea },
    ];

    districts.forEach((district) => {
      // Building cluster
      for (let i = 0; i < 5; i++) {
        const height = 5 + Math.random() * 15;
        const buildingGeometry = new THREE.BoxGeometry(
          3 + Math.random() * 2,
          height,
          3 + Math.random() * 2
        );
        const buildingMaterial = new THREE.MeshStandardMaterial({
          color: district.color,
          metalness: 0.3,
          roughness: 0.7,
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.set(
          district.x + (Math.random() - 0.5) * 15,
          height / 2,
          district.z + (Math.random() - 0.5) * 15
        );
        building.castShadow = true;
        building.receiveShadow = true;
        scene.add(building);
      }

      // District marker
      const markerGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);
      const markerMaterial = new THREE.MeshStandardMaterial({
        color: district.color,
        emissive: district.color,
        emissiveIntensity: 0.5,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(district.x, 0.25, district.z);
      marker.castShadow = true;
      scene.add(marker);
    });

    // Player avatar (sphere)
    const avatarGeometry = new THREE.SphereGeometry(1, 32, 32);
    const avatarMaterial = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.3,
    });
    const avatar = new THREE.Mesh(avatarGeometry, avatarMaterial);
    avatar.position.y = 2;
    avatar.castShadow = true;
    scene.add(avatar);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate avatar
      avatar.rotation.y += 0.01;

      // Orbit camera
      const time = Date.now() * 0.0001;
      camera.position.x = Math.cos(time) * 60;
      camera.position.z = Math.sin(time) * 60;
      camera.lookAt(0, 15, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-slate-900"
      style={{ position: "relative" }}
    >
      <div className="absolute top-6 left-6 z-10 rounded-2xl border border-emerald-400/30 bg-slate-900/80 backdrop-blur-xl p-6 max-w-sm">
        <h2 className="text-2xl font-bold text-emerald-300 mb-3">Lagos 3D Map</h2>
        <div className="space-y-2 text-sm text-slate-300">
          <p>🟥 Victoria Island - Corporate</p>
          <p>🟦 Lekki - Luxury</p>
          <p>🟨 Ikoyi - Elite</p>
          <p>🟩 Yaba - Creative</p>
          <p>🟪 Surulere - Community</p>
        </div>
        <p className="mt-4 text-xs text-slate-500">Drag to explore • Scroll to zoom</p>
      </div>
    </div>
  );
}

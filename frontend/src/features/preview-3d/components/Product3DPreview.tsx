import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { getModelAssetForSize } from '../../../assets/modelRegistry.js';
import { setupSceneLighting } from './Lighting.js';
import { createSurfaceCanvasTexture } from '../textures/artworkTexture.js';
import { RotateCw, ZoomIn, ZoomOut, Compass, Eye, Loader2 } from 'lucide-react';

export function Product3DPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { configuration, currentSurfaceId } = useConfigurator();

  const [isLoadingModel, setIsLoadingModel] = useState<boolean>(true);
  const [modelLoadError, setModelLoadError] = useState<string | null>(null);

  // References to active Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentModelGroupRef = useRef<THREE.Group | null>(null);
  const wallsGroupRef = useRef<THREE.Group | null>(null);
  const fabricMaterialsRef = useRef<Set<THREE.MeshStandardMaterial>>(new Set());

  // Initialize Three.js scene once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0eee8); // Neutral studio background #F0EEE8
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(3.8, 2.4, 4.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going underground
    controls.minDistance = 2.0;
    controls.maxDistance = 9.0;
    controls.target.set(0, 0.4, 0);
    controlsRef.current = controls;

    // Lighting
    setupSceneLighting(scene);

    // Walls group
    const wallsGroup = new THREE.Group();
    scene.add(wallsGroup);
    wallsGroupRef.current = wallsGroup;

    // Animation render loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Load and swap 3D GLB model based on size variant
  useEffect(() => {
    let isCancelled = false;
    const scene = sceneRef.current;
    if (!scene) return;

    const modelAsset = getModelAssetForSize(configuration.size);
    setIsLoadingModel(true);
    setModelLoadError(null);

    const loader = new GLTFLoader();
    loader.load(
      modelAsset.path,
      (gltf) => {
        if (isCancelled) return;
        // Remove previous model if exists
        if (currentModelGroupRef.current) {
          scene.remove(currentModelGroupRef.current);
        }

        const model = gltf.scene;
        model.scale.set(...modelAsset.scale);
        model.position.set(...modelAsset.position);

        // Find fabric meshes and frame meshes
        fabricMaterialsRef.current.clear();
        model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const sourceMaterials = Array.isArray(child.material) ? child.material : [child.material];
            const matName = sourceMaterials.map((material: any) => material?.name || '').join(' ');
            const nodeName = child.name || '';

            // Handle canopy roof material
            if (matName.includes('fabric') || matName.includes('Fabric') || nodeName.includes('fabric')) {
              const customFabricMat = new THREE.MeshStandardMaterial({
                roughness: 0.85,
                metalness: 0.05,
              });
              const nextMaterials = sourceMaterials.map((material: any) => {
                const sourceName = material?.name || '';
                return sourceName.includes('fabric') || sourceName.includes('Fabric') ? customFabricMat : material;
              });
              child.material = Array.isArray(child.material) ? nextMaterials : customFabricMat;
              fabricMaterialsRef.current.add(customFabricMat);
            }

            // Handle aluminum frame nodes
            if (matName.includes('Metal') || nodeName.includes('leg') || nodeName.includes('mechanism')) {
              child.visible = configuration.includeFrame;
            }
          }
        });

        scene.add(model);
        currentModelGroupRef.current = model;
        setIsLoadingModel(false);

        // Immediately update texture once model is mounted
        updateFabricTexture();
      },
      undefined,
      (err) => {
        if (isCancelled) return;
        console.error('Failed to load GLB model:', err);
        setModelLoadError(`Unable to load model file: ${modelAsset.path}`);
        setIsLoadingModel(false);
      }
    );

    return () => {
      isCancelled = true;
    };
  }, [configuration.size]);

  // Update Frame visibility whenever includeFrame changes
  useEffect(() => {
    if (!currentModelGroupRef.current) return;
    currentModelGroupRef.current.traverse((child: any) => {
      if (child.isMesh) {
        const matName = child.material?.name || '';
        const nodeName = child.name || '';
        if (matName.includes('Metal') || nodeName.includes('leg') || nodeName.includes('mechanism')) {
          child.visible = configuration.includeFrame;
        }
      }
    });
  }, [configuration.includeFrame]);

  // Synchronize Roof Texture from configuration state
  const updateFabricTexture = useCallback(() => {
    if (fabricMaterialsRef.current.size === 0) return;

    // Use current active roof or valance surface, or fallback to roof_front
    const targetSurface =
      (currentSurfaceId &&
        (currentSurfaceId.startsWith('roof_') || currentSurfaceId.startsWith('valance_')) &&
        configuration.surfaces[currentSurfaceId]) ||
      configuration.surfaces.roof_front;

    if (!targetSurface) return;

    const texture = createSurfaceCanvasTexture(targetSurface, 1024, 1024);
    fabricMaterialsRef.current.forEach((material) => {
      material.map = texture;
      material.color = new THREE.Color(0xffffff); // rely on canvas texture colors
      material.needsUpdate = true;
    });
  }, [configuration.surfaces, currentSurfaceId]);

  useEffect(() => {
    updateFabricTexture();
  }, [updateFabricTexture]);

  // Dynamic Walls and Half Walls Mesh Generation
  useEffect(() => {
    const wallsGroup = wallsGroupRef.current;
    if (!wallsGroup) return;

    // Clear old walls
    while (wallsGroup.children.length > 0) {
      const child = wallsGroup.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
      else if (child.material) child.material.dispose();
      wallsGroup.remove(child);
    }

    const { walls, halfWalls, size, surfaces } = configuration;
    const modelAsset = getModelAssetForSize(size);
    const halfWidth = 1.0 * (modelAsset.scale[0] || 1.0);
    const wallHeight = 1.6 * (modelAsset.scale[1] || 1.0);
    const wallY = 0.05 * (modelAsset.scale[1] || 1.0);

    const createWallMesh = (
      width: number,
      height: number,
      x: number,
      y: number,
      z: number,
      rotY: number,
      surfaceData: any
    ) => {
      const geo = new THREE.PlaneGeometry(width, height);
      const texture = createSurfaceCanvasTexture(surfaceData, 1024, 768);
      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.85,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.y = rotY;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    // Back Wall
    if (walls !== 'none') {
      const backWall = createWallMesh(
        halfWidth * 2,
        wallHeight,
        0,
        wallY,
        -halfWidth,
        0,
        surfaces.wall_back || { surfaceId: 'wall_back', backgroundColor: '#FFFFFF', elements: [] }
      );
      wallsGroup.add(backWall);
    }

    // Side Walls (Left and Right for 3_single or 3_double)
    if (walls === '3_single' || walls === '3_double') {
      const leftWall = createWallMesh(
        halfWidth * 2,
        wallHeight,
        -halfWidth,
        wallY,
        0,
        Math.PI / 2,
        surfaces.wall_left || { surfaceId: 'wall_left', backgroundColor: '#FFFFFF', elements: [] }
      );
      const rightWall = createWallMesh(
        halfWidth * 2,
        wallHeight,
        halfWidth,
        wallY,
        0,
        -Math.PI / 2,
        surfaces.wall_right || { surfaceId: 'wall_right', backgroundColor: '#FFFFFF', elements: [] }
      );
      wallsGroup.add(leftWall);
      wallsGroup.add(rightWall);
    }

    // Half Walls (skirts)
    if (halfWalls !== 'none') {
      const halfWallH = wallHeight * 0.45;
      const halfWallY = wallY - wallHeight * 0.28;

      const leftHalf = createWallMesh(
        halfWidth * 2,
        halfWallH,
        -halfWidth,
        halfWallY,
        0,
        Math.PI / 2,
        surfaces.halfwall_left || { surfaceId: 'halfwall_left', backgroundColor: '#FFFFFF', elements: [] }
      );
      const rightHalf = createWallMesh(
        halfWidth * 2,
        halfWallH,
        halfWidth,
        halfWallY,
        0,
        -Math.PI / 2,
        surfaces.halfwall_right || { surfaceId: 'halfwall_right', backgroundColor: '#FFFFFF', elements: [] }
      );
      wallsGroup.add(leftHalf);
      wallsGroup.add(rightHalf);
    }
  }, [configuration.walls, configuration.halfWalls, configuration.size, configuration.surfaces]);

  // Camera presets
  const setCameraView = (type: '3/4' | 'front' | 'side' | 'top') => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (type === '3/4') {
      camera.position.set(3.8, 2.4, 4.2);
      controls.target.set(0, 0.4, 0);
    } else if (type === 'front') {
      camera.position.set(0, 1.2, 5.0);
      controls.target.set(0, 0.4, 0);
    } else if (type === 'side') {
      camera.position.set(5.0, 1.2, 0);
      controls.target.set(0, 0.4, 0);
    } else if (type === 'top') {
      camera.position.set(0, 6.0, 0.1);
      controls.target.set(0, 0.4, 0);
    }
    controls.update();
  };

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden bg-[#F0EEE8] select-none flex flex-col">
      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="w-full flex-1 touch-none" />

      {/* Loading Overlay */}
      {isLoadingModel && (
        <div className="absolute inset-0 bg-[#F0EEE8]/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 pointer-events-none">
          <Loader2 className="w-6 h-6 text-[#183C34] animate-spin" />
          <span className="text-xs font-semibold text-[#183C34] tracking-wide">Rendering 3D Model...</span>
        </div>
      )}

      {/* Model Error Notice */}
      {modelLoadError && (
        <div className="absolute top-4 left-4 right-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800">
          {modelLoadError}
        </div>
      )}

      {/* Camera View Angle Preset Controls */}
      <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-lg border border-[#E5E1D8] shadow-xs">
        <button
          onClick={() => setCameraView('3/4')}
          title="3/4 Perspective View"
          className="px-2 py-1 text-[11px] font-medium text-[#183C34] hover:bg-[#F6F4EF] rounded-md transition"
        >
          Perspective
        </button>
        <button
          onClick={() => setCameraView('front')}
          title="Front Facing View"
          className="px-2 py-1 text-[11px] font-medium text-[#625F58] hover:text-[#183C34] hover:bg-[#F6F4EF] rounded-md transition"
        >
          Front
        </button>
        <button
          onClick={() => setCameraView('side')}
          title="Side View"
          className="px-2 py-1 text-[11px] font-medium text-[#625F58] hover:text-[#183C34] hover:bg-[#F6F4EF] rounded-md transition"
        >
          Side
        </button>
        <button
          onClick={() => setCameraView('top')}
          title="Top Down View"
          className="px-2 py-1 text-[11px] font-medium text-[#625F58] hover:text-[#183C34] hover:bg-[#F6F4EF] rounded-md transition"
        >
          Aerial
        </button>
      </div>

      {/* Visual Instruction Badge */}
      <div className="absolute bottom-3 left-3 text-[10px] text-[#8A867E] bg-white/80 px-2 py-1 rounded-md backdrop-blur-xs pointer-events-none flex items-center gap-1.5">
        <RotateCw className="w-3 h-3 text-[#183C34]" />
        Drag to rotate • Scroll to zoom • Right-click to pan
      </div>

      {/* Active Size & Hardware Tag */}
      <div className="absolute top-3 right-3 text-[11px] font-medium text-[#183C34] bg-white/90 px-2.5 py-1 rounded-md border border-[#E5E1D8] shadow-xs">
        {configuration.size} Footprint • {configuration.includeFrame ? 'With Hardware' : 'Skin Only'}
      </div>
    </div>
  );
}

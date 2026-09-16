import * as THREE from 'three';

export function setupSceneLighting(scene: THREE.Scene): void {
  // Ambient light for general soft illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambientLight);

  // Key directional light (sun / main studio spot)
  const dirLight = new THREE.DirectionalLight(0xfffdf7, 1.8);
  dirLight.position.set(5, 8, 5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 25;
  scene.add(dirLight);

  // Fill light from opposite side
  const fillLight = new THREE.DirectionalLight(0xf0eee8, 1.0);
  fillLight.position.set(-5, 4, -4);
  scene.add(fillLight);

  // Ground plane shadow receiver
  const groundGeo = new THREE.PlaneGeometry(14, 14);
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.12 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.0;
  ground.receiveShadow = true;
  scene.add(ground);
}

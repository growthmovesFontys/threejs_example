import * as THREE from 'three';

let lastTime = performance.now();
const moveSpeed = 40; 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9999ff);

const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

let velocity = { x: 0, y: 0 };
let direction = { x: 0, y: 0 };

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      direction.x = -1;
      break;
    case 'ArrowRight':
      direction.x = 1;
      break;
    case 'ArrowDown':
      direction.y = -1;
      break;
    case 'ArrowUp':
      direction.y = 1;
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowRight':
      direction.x = 0;
      break;
    case 'ArrowDown':
    case 'ArrowUp':
      direction.y = 0;
      break;
  }
});

const animate = function () {
  let currentTime = performance.now();
  let deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  velocity.x = moveSpeed * direction.x;
  velocity.y = moveSpeed * direction.y;

  cube.position.x += velocity.x * deltaTime;
  cube.position.y += velocity.y * deltaTime;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

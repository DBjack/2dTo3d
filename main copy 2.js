import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls";
const scene = new THREE.Scene();

const carema = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

carema.position.set(0, 0, 10);
scene.add(carema);

const AxesHelper = new THREE.AxesHelper(5);
scene.add(AxesHelper);
const cubeGeomety = new THREE.BoxGeometry(1, 1, 1);
const cubeMesh = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const parentCubeMesh = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(cubeGeomety, cubeMesh);

const parentCube = new THREE.Mesh(cubeGeomety, parentCubeMesh);
parentCube.add(cube);
scene.add(parentCube);

cube.position.x = 3;
parentCube.position.x = -3;
parentCube.scale.set(2, 2, 2);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(carema, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;

function animation() {
  requestAnimationFrame(animation);
  controls.update();
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, carema);
}
animation();




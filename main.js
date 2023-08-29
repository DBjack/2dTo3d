import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls";
import { GUI } from "./node_modules/three/examples/jsm/libs/lil-gui.module.min.js";
const scene = new THREE.Scene();

const carema = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

console.log(111222333);

carema.position.set(0, 0, 10);
scene.add(carema);

const AxesHelper = new THREE.AxesHelper(5);
scene.add(AxesHelper);

let textureLoader = new THREE.TextureLoader();
const map = textureLoader.load(
  "/texture/watercover/CityNewYork002_COL_VAR1_1K.png"
);

// 加载

const PlaneGeometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map,
  transparent: true,
});
const cube = new THREE.Mesh(PlaneGeometry, material);

scene.add(cube);

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

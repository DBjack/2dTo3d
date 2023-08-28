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

carema.position.set(0, 0, 10);
scene.add(carema);

const AxesHelper = new THREE.AxesHelper(5);
scene.add(AxesHelper);
// const cubeGeomety = new THREE.BoxGeometry(1, 1, 1);
const cubeMesh = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // side: THREE.DoubleSide,
});
const cubeMesh1 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  // side: THREE.DoubleSide,
});

const vertials = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);
const indexes = new Uint16Array([0, 1, 2, 2, 3, 0]);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(vertials, 3));
geometry.index = new THREE.BufferAttribute(indexes, 1);
geometry.addGroup(0, 3, 0);
geometry.addGroup(3, 3, 1);
const cube = new THREE.Mesh(geometry, [cubeMesh, cubeMesh1]);
scene.add(cube);

console.log(geometry);

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

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
const scene = new THREE.Scene();
// 相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 0.1);
scene.add(camera);

// 物体
const boxGemotry = new THREE.SphereGeometry(5, 32, 32);
const loader = new RGBELoader();
loader.load("./model/imgs/hdr/Living.hdr", (texture) => {
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const box = new THREE.Mesh(boxGemotry, material);
  box.geometry.scale(1, 1, -1);
  scene.add(box);
});

// 渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 控制器
const orbitControls = new OrbitControls(camera, renderer.domElement);

function animation() {
  renderer.render(scene, camera);
  orbitControls.update();
  requestAnimationFrame(animation);
}
animation();

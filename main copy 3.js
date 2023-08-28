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

// const button = document.createElement("button");
// button.innerHTML = "全屏";
// button.style.position = "absolute";
// button.style.zIndex = "999";
// button.style.left = "10px";

// button.onclick = function () {
//   document.body.requestFullscreen();
// };

// const button2 = document.createElement("button");
// button2.innerHTML = "退出全屏";
// button2.style.position = "absolute";
// button2.style.left = "100px";
// button2.style.zIndex = "999";

// button2.onclick = function () {
//   document.exitFullscreen();
// };

// document.body.appendChild(button);
// document.body.appendChild(button2);
const gui = new GUI();
const eventObj = {
  fullScreen: function () {
    document.body.requestFullscreen();
  },
  exitScreen: function () {
    document.exitFullscreen();
  },
};
gui.add(eventObj, "fullScreen").name("全屏");
gui.add(eventObj, "exitScreen").name("退出全屏");
gui.add(cube.position, "x", -5, 5).step(1).name("立方体的x轴位移");
gui.add(cube.rotation, "x", -5, 5).step(1).name("立方体的x轴位移");
gui.add(cubeMesh, "wireframe").name("子元素线框模式");
const colorParams = {
  cubeColor: "#ff0000",
};
gui
  .addColor(colorParams, "cubeColor")
  .name("立方体颜色")
  .onChange((val) => {
    cube.material.color.set(val);
  });

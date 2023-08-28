import * as THREE from "three";

// 创建场景
const scene = new THREE.Scene();

// 创建一个相机
const carema = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机的位置
carema.position.set(0, 0, 10);
scene.add(carema);

// 添加物体
// 创建集合体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff00 });
// 根据集合体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 将集合体添加到场景
scene.add(cube);

// 创建一个渲染器
const renderer = new THREE.WebGL1Renderer();
// 设置渲染器的大小
renderer.setSize(innerWidth, innerHeight);

// 将webgl渲染的内容添加到body
document.body.appendChild(renderer.domElement);

function animation() {
  requestAnimationFrame(animation);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, carema);
}

animation();

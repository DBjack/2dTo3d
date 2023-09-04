/* eslint-disable no-console */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#ccc");
scene.environment = new THREE.Color("#ccc");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 4);
scene.add(camera);

const gridHelper = new THREE.GridHelper(10, 10);
gridHelper.material.opacity = 0.5;
gridHelper.material.transparent = true;

scene.add(gridHelper);
const renderer = new THREE.WebGL1Renderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);

// 打光
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(0, 0, 10);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(0, 4, 10);
const light3 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(6, 4, 10);
const light4 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(6, 0, 10);
const light5 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(-6, 4, 10);
const light6 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(-6, 0, 10);
const light7 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(0, 0, -10);

scene.add(light1);
scene.add(light2);
scene.add(light3);
scene.add(light4);
scene.add(light5);
scene.add(light6);
scene.add(light7);

// 设置材质
const faceMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff00,
  metalness: 1,
  roughness: 0.1,
});
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
  transmission: 1,
  transparent: true,
});

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./draco/gltf/"); //含JS和WASM解码器库的文件夹的路径。
loader.setDRACOLoader(dracoLoader);
loader.load("./model/bmw01.glb", (gltf) => {
  const bmw = gltf.scene;
  let childList = [
    "前脸",
    "前轮毂",
    "右后轮毂",
    "宝马双肾",
    "左后轮毂",
    "引擎盖",
    "引擎盖_1",
    "引擎盖_2",
    "车身",
    "进气口",
  ];
  bmw.traverse((child) => {
    childList.push(child.name);
    // if (!child.isMesh) return;
    if (childList.includes(child.name)) {
      child.material = faceMaterial;
    }
    if (child.name === "挡风玻璃") {
      child.material = glassMaterial;
    }
  });
  scene.add(bmw);
});

function animation() {
  renderer.render(scene, camera);
  orbitControls.update();
  requestAnimationFrame(animation);
}

animation();

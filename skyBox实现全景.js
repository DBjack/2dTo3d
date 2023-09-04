import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createSpriteShape, createSpriteText } from "./sprite";

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

// 添加坐标系
const axesHelper = new THREE.AxesHelper(0.1);
scene.add(axesHelper);

const sprite = createSpriteText();
scene.add(sprite);

// 物体
const boxGemotry = new THREE.BoxGeometry(10, 10, 10);
const list = ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"];
const textures = [];
list.map((item) => {
  const loader = new THREE.TextureLoader();
  loader.load(`./model/imgs/living/${item}.jpg`, (texture) => {
    if (item === "4_u" || item === "4_d") {
      texture.rotation = Math.PI;
      texture.center = new THREE.Vector2(0.5, 0.5);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      textures.push(material);
    } else {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      textures.push(material);
    }
  });
});
const box = new THREE.Mesh(boxGemotry, textures);
box.geometry.scale(1, 1, -1);
scene.add(box);

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

import * as THREE from "three";
import * as d3 from "d3";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 创建一个场景
const scene = new THREE.Scene();

// 创建一个相机

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机的位置
camera.position.z = 100;

// 创建一个坐标轴
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴添加到场景中

scene.add(axesHelper);

//将相机添加到场景中

scene.add(camera);

const project = d3.geoMercator().center([107, 31]).translate([0, 0]);

const loader = new THREE.FileLoader();
loader.load(
  "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
  (data) => {
    console.log(JSON.parse(data));
    const features = JSON.parse(data).features;
    features.forEach((feature) => {
      const geometry = feature.geometry;
      if (geometry.type === "MultiPolygon") {
        const coordinates = geometry.coordinates;
        coordinates.forEach((coordinate) => {
          coordinate.forEach((item) => {
            const plogyon = drawPlogyon(item, project);
            const line = drawLine(item, project);
            scene.add(plogyon);
            scene.add(line);
          });
        });
      }
    });
    console.log(scene);
  }
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);
function animate() {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

function drawPlogyon(row, pro) {
  const shape = new THREE.Shape();

  row.forEach((item, index) => {
    const [x, y] = pro(item);
    if (index === 0) {
      shape.moveTo(x, -y);
    } else {
      shape.lineTo(x, -y);
    }
  });

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 3,
    bevelEnabled: true,
  });

  const metrial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.5,
  });

  return new THREE.Mesh(geometry, metrial);
}

function drawLine(row, pro) {
  const bufferGeometry = new THREE.BufferGeometry();
  const pointersArray = [];
  row.forEach((item) => {
    const [x, y] = pro(item);
    pointersArray.push(new THREE.Vector3(x, -y, 4));
  });
  bufferGeometry.setFromPoints(pointersArray);
  const material = new THREE.LineBasicMaterial({
    color: 0x0000ff,
  });

  return new THREE.Line(bufferGeometry, material);
}

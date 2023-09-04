import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机的位置
camera.position.z = 5;

// 创建一个坐标轴
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴添加到场景中
scene.add(axesHelper);

scene.add(camera);

// 创建一个材质 颜色为红色
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

// 加载纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./models/picTo3d/sunset.jpg");

// 创建一个着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `  
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `,
  uniforms: {
    uTexture: {
      value: texture,
    },
  },
});

// 创建一个立方体 几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建一个网格
const cube = new THREE.Mesh(geometry, material);

// 将网格添加到场景中
scene.add(cube);

//创建一个渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将渲染器添加到页面中
document.body.appendChild(renderer.domElement);

// 渲染
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

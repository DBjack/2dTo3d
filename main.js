import * as THREE from "three";

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
camera.position.z = 5;

// 创建一个坐标轴
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴添加到场景中
scene.add(axesHelper);

//将相机添加到场景中
scene.add(camera);

// 创建一个材质 颜色为红色
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

// 加载纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./models/picTo3d/sunset.jpg");
const depthTexture = textureLoader.load("./models/picTo3d/sunset-depth.jpg");

// 创建一个鼠标二维向量
const mouse = new THREE.Vector2();

// 创建一个着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
  // 顶点着色器
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // 片元着色器
  fragmentShader: `  
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `,
  uniforms: {
    uTexture: {
      // 纹理
      value: texture,
    },
    uDepthTexture: {
      // 深度纹理
      value: depthTexture,
    },
    uMouse: {
      // 鼠标二维向量
      value: mouse,
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
  // 递归调用渲染函数
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // 渲染场景
  renderer.render(scene, camera);
}

// 调用渲染函数
animate();

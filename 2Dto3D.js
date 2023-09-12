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

// 加载纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./model/picTo3d/cat.jpg");
const depthTexture = textureLoader.load("./model/picTo3d/cat-depth.jpg");

// 创建一个鼠标二维向量
const mouse = new THREE.Vector2();

// 创建一个着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
  // 顶点着色器
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // 片元着色器
  fragmentShader: `  
      uniform sampler2D uTexture;
      uniform sampler2D uDepthTexture;
      uniform vec2 uMouse;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(uTexture, vUv);
        vec4 depth = texture2D(uDepthTexture, vUv);
        float depthValue = depth.r;
        float distance = distance(uMouse, vUv);
        float x = vUv.x + ((uMouse.x + sin(uTime))*0.01)*depthValue;
        float y = vUv.y + ((uMouse.y + cos(uTime))*0.01)*depthValue;
        vec4 newColor = texture2D(uTexture, vec2(x, y));
        float alpha = smoothstep(0.5, 0.0, distance);
      gl_FragColor = newColor;
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
    uTime: {
      // 时间
      value: 0,
    },
  },
});

// 创建一个立方体 几何体
const geometry = new THREE.PlaneGeometry(19, 12);

// 创建一个网格
const cube = new THREE.Mesh(geometry, shaderMaterial);

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
  // 给材质传入鼠标二维向量
  shaderMaterial.uniforms.uMouse.value = mouse;
  // 给材质传入时间
  shaderMaterial.uniforms.uTime.value = performance.now() / 1000;

  // 递归调用渲染函数
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  // 渲染场景
  renderer.render(scene, camera);
}

// 监听鼠标移动事件
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// 防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}

// 使用防抖函数监听窗口大小变化事件
window.addEventListener(
  "resize",
  debounce(() => {
    // 重新设置渲染器的大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 重新设置相机的宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机的投影矩阵
    camera.updateProjectionMatrix();
  }, 200)
);

// 调用渲染函数
animate();

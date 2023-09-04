import * as THREE from "three";

function createSpriteShape() {
  /*1、创建一个画布，记得设置画布的宽高，否则将使用默认宽高，有可能会导致图像显示变形*/
  let canvas = document.createElement("canvas");
  canvas.width = 120;
  canvas.height = 120;
  /*2、创建图形，这部分可以去看w3c canvas教程*/
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ff0000";
  ctx.arc(50, 50, 50, 0, 2 * Math.PI);
  ctx.fill();
  /*3、将canvas作为纹理，创建Sprite*/
  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true; //注意这句不能少
  let material = new THREE.SpriteMaterial({ map: texture });
  let mesh = new THREE.Sprite(material);
  /*4、放大图片，每个精灵有自己的大小，默认情况下都是很小的，如果你不放大，基本是看不到的*/

  return mesh;
}

function createSpriteText() {
  //先用画布将文字画出
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffff00";
  ctx.font = "Bold 100px Arial";
  ctx.lineWidth = 4;
  ctx.fillText("卧室", 4, 104);
  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  //使用Sprite显示文字
  let material = new THREE.SpriteMaterial({ map: texture }); //通过动态canvas也就是说我们能再three里面自己随意写2d字体。动态更新文字等等功能
  let textObj = new THREE.Sprite(material);
  textObj.position.set(-0.1, -0.1, -0.1);
  textObj.scale.set(0.01, 0.01, 0.01);
  return textObj;
}
export { createSpriteShape, createSpriteText };

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT);
camera.position.z = 4.5;
camera.position.x = -1.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);

scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
// Tamaño Cubo Inicial
Size = 2;
m = Size;
// Cantidad Cubos
Cubes = 0
// Posición cubos
x = Size / 2;
y = Size / 2;
z = Size / 2;

c = 0
cube = [];
material = [];
color = [];

function animation1(){
  color[c] = Math.random() * 0xffffff;
  var geometry = new THREE.BoxGeometry(Size, Size, Size);
  material.push(new THREE.MeshPhongMaterial({ color: color[c] }));
  cube[c] = new THREE.Mesh(geometry, material[c]);

  cube[c].translateX(x);
  cube[c].translateY(y);
  cube[c].translateZ(z);
  
  y = y + (Size - (Size/4));
  
  Size = Size / 2;
  scene.add(cube[c])
}

function animation2(){
  if(c == 0){
    cube[c].position.x += 5;
  }else{
    if(c == 1){
      cube[c].rotation.y += 10;
    }else{
      if(c == 2){
        cube[c].scale.z += 15;  
      }
    }
  } 
}

const light1 = new THREE.DirectionalLight(0x00ffff, 1);
light1.position.set(-1, 2, 4);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0x00ffff, 1);
light2.position.set(1, -2, -4);
scene.add(light2);

const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

s = 0;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);
document.addEventListener('keydown', function(event) {
  switch(event.keyCode) {
      case 83:
      if(c < 3){
        if (s == 0){
          animation1();
          s = 1;
        }else{
          animation2();
          c++;
          s = 0;
        }
      }else{
        i = 0;
        do{
          scene.remove(cube[i]);
          cube[i].geometry.dispose();
          cube[i].material.dispose();
          cube[i] = undefined;
          i = i + 1;
        }while(i < 3);
        c = 0;
        s = 0;
        Size = m;
        x = Size / 2;
        y = Size / 2;
        z = Size / 2;
      }
      break;
  }
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();

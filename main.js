// three js lib
import * as THREE from 'three'
// kamera kontrolleri
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// sliderlar için gui
import {GUI} from 'dat.gui'

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({powerPreference: "high-performance"}); 
// antialias: - 40 fps, kötü performans

camera.position.z = 50; // uzaklık

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x444444, 1); // arkaplan rengi
document.body.appendChild( renderer.domElement );

// küp
const geometry = new THREE.BoxGeometry( 10, 10, 10 );

// what covers an object; color, texture etc.
const material = new THREE.MeshLambertMaterial({ color: 0xdddddd }); // parametreler {} içinde veriliyor.

// mesh: to apply material to a geometry;
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
// scene.add(camera); optional gibimsi

cube.position.x = 0;

// torus?? objesi
const torusGeometry = new THREE.TorusGeometry(7,1,6,12);
const phongMaterial = new THREE.MeshPhongMaterial({color: 0xdddddd});
const torus = new THREE.Mesh(torusGeometry, phongMaterial);
//scene.add(torus);

// küre
const sphere = new THREE.SphereGeometry(7, 30, 30);
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x555555});
const sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
sphereMesh.position.x = 0;
sphereMesh.position.y = 20;
//scene.add(sphereMesh);

// yer düzlemi
const planeGeometry = new THREE.PlaneGeometry(100, 100, 100);
const planeMaterial = new THREE.MeshLambertMaterial({color: 0x555555});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// rotation olmazsa düzlem yerde olmuyor
plane.rotation.x = -0.5 * Math.PI; 
plane.position.y = -10;
scene.add(plane);

// dodecahedron
const dodecahedronGeometry = new THREE.DodecahedronGeometry(7);
const lambertMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd});
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, lambertMaterial);
dodecahedron.position.x = 25;
scene.add(dodecahedron);

// directional light
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(1,0,0);
// scene.add(light);

// point light
const pl = new THREE.PointLight(0xffffff, 500);
pl.position.set(0,30,6);
scene.add(pl);

// mouse controls
const controls = new OrbitControls(camera, renderer.domElement);

const gui = new GUI();

gui.add(pl.position, 'x', -100, 100);
gui.add(pl.position, 'y', -100, 100);
gui.add(pl.position, 'z', -100, 100);


// fps counter
var fps = document.getElementById("fps");
var startTime = Date.now();
var frame = 0;

function tick() {
  window.requestAnimationFrame(tick);
}

let t = 0;
function render() {
    
    requestAnimationFrame(render); // re renders constantly on every frame

    var time = Date.now();
    frame++;
    if (time - startTime > 1000) {
        fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
        startTime = time;
        frame = 0;
    }

    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    cube.rotation.z += 0.005;
    //cube.rotation.set(0.4, 0.2, 0); yönünü çeviriyo; statik

    t += 0.01;
    // torus.scale.y = Math.abs(Math.sin(t));
    // dodecahedron.position.y = -7 * Math.sin(t);

    controls.update(); // mouse update
    renderer.render( scene, camera );
}
tick();
//
// document.getElementById("küp").innerHTML = cube.position.x + ", " + cube.position.y + ", " + cube.position.z;
// document.getElementById("yuvarlak").innerHTML = torus.position.x + ", " + torus.position.y + ", " + torus.position.z;

window.addEventListener('keydown', (event) =>{
    switch (event.code){
        case 'KeyA':
            camera.position.x -= 5;
            //cube.position.x -= 5;
        
            break;
        case 'KeyD':
            camera.position.x += 5;
            //cube.position.x += 5;
            break;
        case 'KeyW':
            camera.position.z -= 5;
            //cube.position.y += 5;was
            break;
        case 'KeyS':
            camera.position.z += 5;
            //cube.position.y -= 5;
            break;
        case 'KeyQ':
            // mouse q ve e yi overrideliyor
            camera.rotation.y += Math.PI / 60;
            //cube.position.z += 5;
            break;
        case 'KeyE':
            camera.rotation.y -= Math.PI / 60;
            break;
    }
});

render();
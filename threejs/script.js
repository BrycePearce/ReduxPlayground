import * as THREE from './node_modules/three/src/Three.js';

// Objects
import {
    cube
} from './cube.js';

/* 
 * To display anything with Three.js, we need a scene, camera, and renderer. So that we can render a scene. 
 */
const scene = new THREE.Scene();

// Options: field of view, aspect ratio, near clipping plane, far clipping plane (deals with render distance)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// renders the above generated scene, as a canvas element on the document body
document.body.appendChild(renderer.domElement);

// Add a cube to our scene, by default it sets it at 0,0,0 - which is where the camera is. We will not be ablve to see it by default
scene.add(cube);

// Move the camera out so we can see the cube
camera.position.z = 5;

// renders everything
function animate() {
    // rotate our cube, each time animate is called, it re-draws the scene, so at every re-draw instance it updates the position by 0.05
    cube.rotation.x += 0.03;
    cube.rotation.y -= 0.03;

    // create a loop that draws, and re-draws the scene every time the screen is refreshed. (60 times per second on avg)
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// choppy move camera around
function onDocumentKeyDown(event) {
    const keyCode = event.which;
    const moveSpeed = 0.5;
    if (keyCode === 87) {
        camera.position.y += moveSpeed;
    } else if (keyCode === 83) {
        camera.position.y -= moveSpeed;
    } else if (keyCode === 65) {
        camera.position.x -= moveSpeed;
    } else if (keyCode === 68) {
        camera.position.x += moveSpeed;
    } else if (keyCode === 32) {
        camera.position.set(0, 0, 0);
    }
};

document.addEventListener("keydown", onDocumentKeyDown, false);


animate();
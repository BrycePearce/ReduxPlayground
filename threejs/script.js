import * as THREE from './node_modules/three/src/Three.js';

// Objects
import {
    cube
} from './cube.js';

// Controls
import {
    FlyControls
} from './node_modules/three/examples/jsm/controls/FlyControls.js';

// todo: abstract these three things outside, use singleton pattern
// https://alligator.io/js/js-singletons/
/* 
 * To display anything with Three.js, we need a scene, camera, and renderer. So that we can render a scene. 
 */
const scene = new THREE.Scene();

// Options: field of view, aspect ratio, near clipping plane, far clipping plane (deals with render distance)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

const controls = new FlyControls(camera, renderer.domElement);
const clock = new THREE.Clock();

init();
animate();

function init() {

    // renders the above generated scene, as a canvas element on the document body
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // set up camera controls
    controls.movementSpeed = 50;
    controls.rollSpeed = Math.PI / 24;

    // Add a cube to our scene, by default it sets it at 0,0,0 - which is where the camera is. We will not be ablve to see it by default
    let grid = new THREE.Object3D();
    for (let row = 0; row < 100; row++) {
        for (let col = 0; col < 100; col++) {
            const box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
                color: '#106b8c',
                wireframe: true,
            }));
            box.position.x = (row - 10 / 2) * 10;
            box.position.y = (col - 10 / 2) * 10;
            grid.add(box);
        }
    }
    scene.add(grid);

    // Move the camera out so we can see the cube
    camera.position.z = 1005;
}

// renders everything
function animate() {
    const delta = clock.getDelta();
    // rotate our cube, each time animate is called, it re-draws the scene, so at every re-draw instance it updates the position by 0.05
    cube.rotation.x += 0.03;
    cube.rotation.y -= 0.03;

    controls.update(delta);
    // create a loop that draws, and re-draws the scene every time the screen is refreshed. (60 times per second on avg)
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
import * as THREE from './node_modules/three/src/Three.js';

import createEnvironment from './environment.js';
import props from './config/reference.js';
import createUser from './user.js';
import render from './render.js'

/* 
 * To display anything with Three.js, we need a scene, camera, and renderer. So that we can render a scene. 
 */

function createScene() {
    props.scene = new THREE.Scene();
};

function createRenderer() {
    props.renderer = new THREE.WebGLRenderer({});
    props.renderer.setSize(window.innerWidth, window.innerHeight);
    // Append the render canvas to the DOM as a canvas element
    document.body.appendChild(props.renderer.domElement);
};

function createCamera() {
    props.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // default camera position
    props.camera.position.z = 500;
}

export default () => {
    createScene();
    createRenderer();
    createCamera();

    createEnvironment();
    createUser();
    render();
}
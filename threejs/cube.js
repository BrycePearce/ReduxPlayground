import * as THREE from './node_modules/three/src/Three.js';

// Box Geometry contains all the vertices and fills the faces of the cube
const geometry = new THREE.BoxGeometry(2, 2, 2);

// create a material to color the cube with
const material = new THREE.MeshBasicMaterial({
    color: '#106b8c',
    wireframe: true,
});

// Mesh takes the geometry and applies material to it, which we can then insert into our scene
const cube = new THREE.Mesh(geometry, material);

export {
    cube
};
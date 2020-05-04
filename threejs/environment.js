import * as THREE from './node_modules/three/src/Three.js';

import props from './config/reference.js';

export default () => {
    generateStars();
    generateCubeWall();
};

function generateCubeWall() {
    let grid = new THREE.Object3D();
    for (let row = 0; row < 50; row++) {
        for (let col = 0; col < 50; col++) {
            const box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
                color: '#106b8c',
                wireframe: true
            }));
            box.position.x = (row - 10 / 2) * 10;
            box.position.y = (col - 10 / 2) * 10;
            grid.add(box);
        }
    }
    props.structure.cubeGrid = grid;
    props.scene.add(props.structure.cubeGrid);
}

// if need to update in render, add to props.structure
function generateStars() {
    let vertices = [];

    for (var i = 0; i < 10000; i++) {

        let x = THREE.MathUtils.randFloatSpread(2000);
        let y = THREE.MathUtils.randFloatSpread(2000);
        let z = THREE.MathUtils.randFloatSpread(2000);

        vertices.push(x, y, z);

    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0x888888
    });

    const points = new THREE.Points(geometry, material);

    props.wscene.add(points);
}
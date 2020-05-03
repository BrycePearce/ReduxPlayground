import * as THREE from './node_modules/three/src/Three.js';

import props from './config/reference.js';

export default () => {
    let grid = new THREE.Object3D();
    for (let row = 0; row < 50; row++) {
        for (let col = 0; col < 50; col++) {
            const box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
                color: '#106b8c',
                wireframe: true,
            }));
            box.position.x = (row - 10 / 2) * 10;
            box.position.y = (col - 10 / 2) * 10;
            grid.add(box);
        }
    }
    props.structure.cubeGrid = grid;
    props.scene.add(props.structure.cubeGrid);
};
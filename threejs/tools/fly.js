import * as THREE from '../node_modules/three/src/Three.js';

import {
    FlyControls
} from '../node_modules/three/examples/jsm/controls/FlyControls.js';
import props from '../config/reference.js';
import tools from '../tools/fly.js';

export default () => {
    // not sure if this is the best place to set these settings
    const controls = new FlyControls(props.camera, props.renderer.domElement);
    controls.movementSpeed = 75;
    controls.rollSpeed = 0.8;
    tools.fly = controls;
    tools.clock = new THREE.Clock();
};
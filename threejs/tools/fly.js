import * as THREE from '../node_modules/three/src/Three.js';

import {
    FlyControls
} from '../node_modules/three/examples/jsm/controls/FlyControls.js';
import props from '../config/reference.js';
import tools from '../tools/fly.js';

export default () => {
    tools.fly = new FlyControls(props.camera, props.renderer.domElement)
    tools.clock = new THREE.Clock();
};
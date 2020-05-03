import props from './config/reference.js';
import tools from './tools/fly.js';

function updateEnvironment() {
    // adds movement functionality
    const delta = tools.clock.getDelta();
    tools.fly.update(delta);

    // move cube grid
    props.structure.cubeGrid.rotation.x += 0.0009;
    props.structure.cubeGrid.rotation.y = 0.0009;

    // move individual cubes
    props.structure.cubeGrid.children.forEach((cubeMesh) => {
        cubeMesh.rotation.x += 0.03;
        cubeMesh.rotation.y += 0.03;
    });
}

// renders everything
export default function render() {
    updateEnvironment();

    // create a loop that draws, and re-draws the scene every time the screen is refreshed. (60 times per second on avg)
    requestAnimationFrame(render);

    // render the current frame
    props.renderer.render(props.scene, props.camera);
}

/**
 * Update the camera and renderer based on window size.
 */
function windowResizeHandler() {
    props.camera.aspect = window.innerWidth / window.innerHeight;
    props.camera.updateProjectionMatrix();
    props.renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', windowResizeHandler, false);
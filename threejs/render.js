import props from './config/reference.js';
import tools from './tools/fly.js';

// renders everything
export default function render() {
    const delta = tools.clock.getDelta();
    tools.fly.update(delta);

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
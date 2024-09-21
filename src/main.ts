import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupScene } from './sceneSetup';
import { createLights } from './lights';
import { setupGUI } from './gui';

const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement;
const { scene, camera, renderer } = setupScene(canvas);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const { lights, helpers, animate: animateLights } = createLights(scene);
setupGUI(lights, helpers);

const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    animateLights(elapsedTime);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
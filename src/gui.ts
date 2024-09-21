import GUI from 'lil-gui';
import * as THREE from 'three';

export const setupGUI = (lights: any, helpers: any) => {
    const gui = new GUI();

    const addLightFolder = (light: THREE.Light, helper: THREE.Object3D | undefined, name: string) => {
        const folder = gui.addFolder(name);
        folder.add(light, 'intensity', 0, 2, 0.01).name('Intensity');
        folder.addColor(new THREE.Color(light.color), 'r').name('Red');
        folder.addColor(new THREE.Color(light.color), 'g').name('Green');
        folder.addColor(new THREE.Color(light.color), 'b').name('Blue');
        if ('position' in light) {
            folder.add(light.position, 'x', -10, 10, 0.1).name('Position X');
            folder.add(light.position, 'y', 0, 10, 0.1).name('Position Y');
            folder.add(light.position, 'z', -10, 10, 0.1).name('Position Z');
        }
        if (light instanceof THREE.SpotLight) {
            folder.add(light, 'angle', 0, Math.PI / 2, 0.01).name('Angle');
            folder.add(light, 'penumbra', 0, 1, 0.01).name('Penumbra');
        }
        if (helper) {
            folder.add(helper, 'visible').name('Show Helper');
        }
        return folder;
    };

    addLightFolder(lights.sunMoon.light, helpers.sunMoon, 'Sun/Moon Light');
    addLightFolder(lights.fill.light, helpers.fill, 'Fill Light');
    addLightFolder(lights.rim.light, helpers.rim, 'Rim Light');
    addLightFolder(lights.key.light, helpers.key, 'Key Light');
    addLightFolder(lights.ambient.light, undefined, 'Ambient Light');
    addLightFolder(lights.point.light, helpers.point, 'Point Light');
    addLightFolder(lights.hemisphere.light, helpers.hemisphere, 'Hemisphere Light');
    addLightFolder(lights.rectArea.light, helpers.rectArea, 'RectArea Light');
};
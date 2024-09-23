import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

type LightWithHelper = {
    light: THREE.Light;
    helper?: THREE.Object3D;
};

export const createLights = (scene: THREE.Scene) => {
    RectAreaLightUniformsLib.init();

    const createLightWithHelper = (
        lightType: 'DirectionalLight' | 'SpotLight' | 'AmbientLight' | 'PointLight' | 'HemisphereLight' | 'RectAreaLight',
        color: THREE.ColorRepresentation,
        intensity: number,
        ...params: any[]
    ): LightWithHelper => {
        let LightClass: any;
        let helperClass: any;

        switch (lightType) {
            case 'DirectionalLight':
                LightClass = THREE.DirectionalLight;
                helperClass = THREE.DirectionalLightHelper;
                break;
            case 'SpotLight':
                LightClass = THREE.SpotLight;
                helperClass = THREE.SpotLightHelper;
                break;
            case 'AmbientLight':
                LightClass = THREE.AmbientLight;
                helperClass = null;
                break;
            case 'PointLight':
                LightClass = THREE.PointLight;
                helperClass = THREE.PointLightHelper;
                break;
            case 'HemisphereLight':
                LightClass = THREE.HemisphereLight;
                helperClass = THREE.HemisphereLightHelper;
                break;
            case 'RectAreaLight':
                LightClass = THREE.RectAreaLight;
                helperClass = RectAreaLightHelper;
                break;
            default:
                throw new Error(`Unsupported light type: ${lightType}`);
        }

        const light = new LightClass(color, intensity, ...params) as THREE.Light;
        let helper: THREE.Object3D<THREE.Object3DEventMap> | undefined;
        if (helperClass) {
            helper = new helperClass(light);
            if (helper) {
                helper.visible = false; // Set helper visibility to false by default
            }
        }
        return { light, helper };
    };

    const sunMoon = createLightWithHelper('DirectionalLight', 0xffffff, 1);
    sunMoon.light.position.set(4, 5, -2);
    sunMoon.light.castShadow = true;
    (sunMoon.light as THREE.DirectionalLight).shadow.mapSize.width = 1024;
    (sunMoon.light as THREE.DirectionalLight).shadow.mapSize.height = 1024;
    (sunMoon.light as THREE.DirectionalLight).shadow.camera.far = 15;
    scene.add(sunMoon.light);
    if (sunMoon.helper) scene.add(sunMoon.helper);

    const fill = createLightWithHelper('DirectionalLight', 0xffffff, 0.3);
    fill.light.position.set(-4, 3, 4);
    scene.add(fill.light);
    if (fill.helper) scene.add(fill.helper);

    const rim = createLightWithHelper('SpotLight', 0xffffff, 0.5, 20, Math.PI * 0.25, 0.5, 1);
    rim.light.position.set(0, 5, -5);
    scene.add(rim.light);
    if (rim.helper) scene.add(rim.helper);

    const key = createLightWithHelper('SpotLight', 0xffffff, 1, 20, Math.PI * 0.3, 0.5, 1);
    key.light.position.set(5, 5, 5);
    key.light.castShadow = true;
    scene.add(key.light);
    if (key.helper) scene.add(key.helper);

    const ambient = createLightWithHelper('AmbientLight', 0xffffff, 0.7);
    scene.add(ambient.light);

    const point = createLightWithHelper('PointLight', 0xffaa00, 1, 10, 2);
    point.light.position.set(0, 2.4, 1.6);
    scene.add(point.light);
    if (point.helper) scene.add(point.helper);

    const hemisphere = createLightWithHelper('HemisphereLight', 0x0000ff, 0x00ff00, 0.3);
    scene.add(hemisphere.light);
    if (hemisphere.helper) scene.add(hemisphere.helper);

    const rectArea = createLightWithHelper('RectAreaLight', 0xffffff, 1, 2, 2);
    rectArea.light.position.set(0, 2, -5);
    rectArea.light.lookAt(0, 0, 0);
    scene.add(rectArea.light);
    if (rectArea.helper) scene.add(rectArea.helper);

    const sunMoonSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    scene.add(sunMoonSphere);

    const lights = { sunMoon, fill, rim, key, ambient, point, hemisphere, rectArea };
    const helpers = { sunMoon: sunMoon.helper, fill: fill.helper, rim: rim.helper, key: key.helper, point: point.helper, hemisphere: hemisphere.helper, rectArea: rectArea.helper };

    const animate = (elapsedTime: number) => {
        // Animate sun/moon position
        const angle = elapsedTime * 0.1;
        const radius = 10;
        sunMoon.light.position.x = Math.cos(angle) * radius;
        sunMoon.light.position.y = Math.abs(Math.sin(angle)) * radius;
        sunMoon.light.position.z = Math.sin(angle) * radius;
        sunMoonSphere.position.copy(sunMoon.light.position);

        // Change light color based on position (day/night cycle)
        const normalizedY = (Math.sin(angle) + 1) / 2; // 0 to 1
        const dayColor = new THREE.Color(0xffffff); // White for day
        const nightColor = new THREE.Color(0x3c6cbb); // Blue for night
        sunMoon.light.color.copy(dayColor).lerp(nightColor, 1 - normalizedY);
        sunMoonSphere.material.color.copy(sunMoon.light.color);

        // Update light helpers
        Object.values(helpers).forEach(helper => {
            if (helper && helper.visible && isHelperWithUpdate(helper)) {
                helper.update();
            }
        });

        if (helpers.rectArea && helpers.rectArea.visible) {
            helpers.rectArea.position.copy(rectArea.light.position);
            helpers.rectArea.quaternion.copy(rectArea.light.quaternion);
        }
    };

    function isHelperWithUpdate(helper: THREE.Object3D<THREE.Object3DEventMap>): helper is THREE.Object3D<THREE.Object3DEventMap> & { update: () => void; } {
        return 'update' in helper;
    }

    return { lights, helpers, animate };
};
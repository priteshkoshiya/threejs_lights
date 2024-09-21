import * as THREE from 'three';

export const setupScene = (canvas: HTMLCanvasElement) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), groundMaterial);
    ground.rotation.x = -Math.PI * 0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    const house = new THREE.Group();
    scene.add(house);

    const walls = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 3), buildingMaterial);
    walls.position.y = 1.25;
    walls.castShadow = true;
    walls.receiveShadow = true;
    house.add(walls);

    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3, 1, 4),
        new THREE.MeshStandardMaterial({ color: 0x885522 })
    );
    roof.position.y = 3;
    roof.rotation.y = Math.PI * 0.25;
    roof.castShadow = true;
    roof.receiveShadow = true;
    house.add(roof);

    const createTree = (x: number, z: number) => {
        const tree = new THREE.Group();

        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 1, 8),
            new THREE.MeshStandardMaterial({ color: 0x8B4513 })
        );
        trunk.position.y = 0.5;
        tree.add(trunk);

        const leaves = new THREE.Mesh(
            new THREE.ConeGeometry(1, 2, 8),
            new THREE.MeshStandardMaterial({ color: 0x228B22 })
        );
        leaves.position.y = 2;
        tree.add(leaves);

        tree.position.set(x, 0, z);
        tree.castShadow = true;
        tree.receiveShadow = true;
        return tree;
    };

    scene.add(createTree(-5, -3), createTree(6, 2), createTree(-3, 5));

    return { scene, camera, renderer };
};
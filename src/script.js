import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('./textures/NormalMap.png');

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereGeometry(1, 32, 16);

// Materials
// const material = new THREE.MeshBasicMaterial();
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.2;
material.metalness = 0.7;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Light 1
const pointLight1Color = { color: 0xff0000 };
const pointLight1 = new THREE.PointLight(pointLight1Color.color, 3);
pointLight1.position.set(1, 1, 1);
scene.add(pointLight1);

const light1 = gui.addFolder('Light 1');
light1.add(pointLight1.position, 'x');
light1.add(pointLight1.position, 'y');
light1.add(pointLight1.position, 'z');
light1.add(pointLight1, 'intensity');
light1.addColor(pointLight1Color, 'color').onChange(() => {
    pointLight1.color.set(pointLight1Color.color);
});
const pointLightHelper = new THREE.PointLightHelper(pointLight1, 1);
scene.add(pointLightHelper);



/* Sizes */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/* Camera */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/* Renderer */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/* Interactivity */
document.addEventListener()

/* Animat */
const clock = new THREE.Clock();

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();




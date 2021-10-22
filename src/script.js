import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { Object3D } from 'three';
// import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from 'https://threejs.org/examples/jsm/loaders/RGBELoader.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import { Pass } from 'three/examples/jsm/postprocessing/ClearPass.js';

// Loading textures Earth
const textureLoader = new THREE.TextureLoader();
const mapTexture = textureLoader.load('/textures/2_no_clouds_4k.jpg');
const bumpTexture = textureLoader.load('/textures/elev_bump_4k.jpg');
const specularTexture = textureLoader.load('/textures/water_4k.jpg');
const cloudMapTexture = textureLoader.load('/textures/fair_clouds_4k.png');

// Loading textures Sun
const sunTexture = textureLoader.load('/textures/2k_sun.jpg');

// Loading textures Moon
const moonTexture = textureLoader.load('/textures/2k_moon.jpg');

// Loading textures Sphere
// const textureLoader = new THREE.TextureLoader();
// const normalTexture = textureLoader.load('/textures/NormalMap.png');

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects

// Earth
const geometry = new THREE.SphereGeometry(0.5, 64, 64);

// Materials
const material = new THREE.MeshPhongMaterial({
	bumpScale: 0.005,
	specular: new THREE.Color('grey')
});
material.map = mapTexture;
material.bumpMap = bumpTexture;
material.specularMap = specularTexture;
material.shininess = 12;

// Clouds
const geometryClouds = new THREE.SphereGeometry(0.503, 64, 64);

// Materials
const materialClouds = new THREE.MeshPhongMaterial();
materialClouds.transparent = true;
materialClouds.map = cloudMapTexture;

// Sun
const geometrySun = new THREE.SphereGeometry(5, 64, 64);

const sunPosition = [25, 12, 10];

// Materials
const materialsSun = new THREE.MeshBasicMaterial();
materialsSun.map = sunTexture;
materialsSun.color = new THREE.Color(0xff8000);

// Moon
const geometryMoon = new THREE.SphereGeometry(0.15, 64, 64);

// Materials
const materialMoon = new THREE.MeshBasicMaterial();
materialMoon.map = moonTexture;

// Moon axis Obj
const geometryMoonAxis = new THREE.SphereGeometry(0.01, 64, 64);

// Materials
const materialMoonAxis = new THREE.MeshBasicMaterial();

// Materials sphere
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.7;
// material.roughness = 0.6;
// // material.normalMap = normalTexture;
// material.wireframe = true;
// material.wireframeLinewidth = 0.5;
// material.color = new THREE.Color(0x777777);

// Mesh
const sphere = new THREE.Mesh(geometry, material);

const clouds = new THREE.Mesh(geometryClouds, materialClouds);

const group = new THREE.Group();
group.add(sphere);
group.add(clouds);

scene.add(group);

const sun = new THREE.Mesh(geometrySun, materialsSun);
sun.position.set(...sunPosition);
scene.add(sun);

const moon = new THREE.Mesh(geometryMoon, materialMoon);
moon.position.set(1.8, 0.6, 0);
scene.add(moon);

const moonAxis = new THREE.Mesh(geometryMoonAxis, materialMoonAxis);
scene.add(moonAxis);

// Moon pivot point
const pivotPoint = new THREE.Object3D();
moonAxis.add(pivotPoint);

pivotPoint.add(moon);

// Stars
function addStar() {
	const geometryStar = new THREE.SphereGeometry(0.07, 6, 6);
	const materialStar = new THREE.MeshStandardMaterial();
	materialStar.color = new THREE.Color(0xffffff);
	materialStar.roughness = 0.1;
	const star = new THREE.Mesh(geometryStar, materialStar);

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(300));

	star.position.set(x, y, z);
	scene.add(star);

	// Array(100).fill().forEach(addStar);
}

Array(800).fill().forEach(addStar);

// Lights Earth
scene.add(new THREE.AmbientLight(0x333333));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(...sunPosition);
scene.add(light);

const lightHelper = new THREE.PointLightHelper(light, 1);
scene.add(lightHelper);

const lightSun = gui.addFolder('Light');
lightSun.add(light, 'intensity').min(0).max(1).step(0.01);

// Lights Sphere

// // Light 1
// const pointLight = new THREE.PointLight(0xffff00, 4);
// pointLight.position.x = 0;
// pointLight.position.y = 0;
// pointLight.position.z = -5;
// scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

// // Light 2
// const pointLight2 = new THREE.PointLight(0xff0000, 5);
// pointLight2.position.set(-5, 0, 0);
// // pointLight2.intensity = 4;
// scene.add(pointLight2);

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper2);

// // const light2 = gui.addFolder('Light 2');

// // light2.add(pointLight2.position, 'x').min(-3).max(3).step(0.01);
// // light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
// // light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
// // light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

// // const light2Color = {
// // 	color: 0xffffff
// // };

// // light2.addColor(light2Color, 'color').onChange(() => {
// // 	pointLight2.color.set(light2Color.color);
// // });

// // Light 3
// const pointLight3 = new THREE.PointLight(0x0000ff, 5);
// pointLight3.position.set(0, -5, 0);
// // pointLight3.intensity = 4;
// scene.add(pointLight3);

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper3);

// // const light3 = gui.addFolder('Light 3');

// // light3.add(pointLight3.position, 'x').min(-3).max(3).step(0.01);
// // light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01);
// // light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
// // light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

// // const light3Color = {
// // 	color: 0xffffff
// // };

// // light3.addColor(light3Color, 'color').onChange(() => {
// // 	pointLight3.color.set(light3Color.color);
// // });

// // Light 4
// const pointLight4 = new THREE.PointLight(0x00ff00, 5);
// pointLight4.position.set(5, 0, 0);
// scene.add(pointLight4);

// const pointLightHelper4 = new THREE.PointLightHelper(pointLight4, 1);
// scene.add(pointLightHelper4);

// // Light 5
// const pointLight5 = new THREE.PointLight(0x800080, 5);
// pointLight5.position.set(0, 0, 5);
// // pointLight5.intensity = 4;
// scene.add(pointLight5);

// const pointLightHelper5 = new THREE.PointLightHelper(pointLight5, 1);
// scene.add(pointLightHelper5);

// // Light 6
// const pointLight6 = new THREE.PointLight(0xffa500, 5);
// pointLight6.position.set(0, 5, 0);
// // pointLight6.intensity = 4;
// scene.add(pointLight6);

// const pointLightHelper6 = new THREE.PointLightHelper(pointLight6, 1);
// scene.add(pointLightHelper6);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
};

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	45,
	sizes.width / sizes.height,
	0.01,
	1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Animate
 */
// document.addEventListener('dragstart', onDocumentMouseMove);

// document.addEventListener('touchmove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

// THREE.Object3D.prototype.rotateOnWorldAxis = function () {
// 	const q = new THREE.Quaternion();

// 	return function rotateAroundWorldAxis(point, axis, angle) {
// 		const sun = new THREE.Mesh(geometrySun, materialsSun);
// 		q.setFromAxisAngle(THREE.Vector3(0, 1, 0), angle);

// 		this.applyQuaternion(q);

// 		this.position.sub(point);
// 		this.position.applyQuaternion(q);
// 		this.position.add(point);
// 	};
// };

// const updateSphere = (event) => {
// 	sphere.position.y = window.scrollY * 0.1;
// 	clouds.position.y = window.scrollY * 0.1;
// };

// window.addEventListener('scroll', updateSphere);

// const clearPass = new THREE.ClearPass();

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
	antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// /**
//  * POST PROCESSING
//  */

// const bloomPass = new UnrealBloomPass(
// 	new THREE.Vector2(sizes.width, sizes.height),
// 	1.5,
// 	0.4,
// 	0.85
// );
// bloomPass.threshold = 0.0;
// bloomPass.strength = 2;
// bloomPass.radius = 0.0;

// const composer = new EffectComposer(renderer);
// composer.setSize(sizes.width, sizes.height);

// composer.addPass(bloomPass);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
// controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;
controls.enablePan = false;
controls.enableRotate = true;

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
	targetX = mouseX * 0.005;
	targetY = mouseY * 0.005;

	const elapsedTime = clock.getElapsedTime();
	const delta = clock.getDelta();

	// Update objects
	sphere.rotation.y = 0.4 * elapsedTime;
	clouds.rotation.y = 0.4 * elapsedTime;
	moon.rotation.y = 0.05 * elapsedTime;
	moonAxis.rotation.y = 0.05 * elapsedTime;

	sphere.rotation.y += 0.285 * (targetX - sphere.rotation.y);
	sphere.rotation.x += 0.04 * (targetY - sphere.rotation.x);
	// sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

	clouds.rotation.y += 0.4 * (targetX - sphere.rotation.y);
	clouds.rotation.x += 0.04 * (targetY - sphere.rotation.x);
	// sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

	// Update Orbital Controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();

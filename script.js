const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

// Helpers
const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

// Params
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const params = {
  rx: 0,
  ry: 0,
  rz: 0,
};

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({canvas});

const render = (renderer) => {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 5;
scene.add(camera);

// Material
const material = new THREE.MeshNormalMaterial();

// Font
const fontLoader = new THREE.FontLoader();
const textGroup = new THREE.Group();
scene.add(textGroup);

// Geometry
const geometry = new THREE.OctahedronGeometry();
const shapes = [];

for (i = 0; i < 20; i++) {
  const shape = new THREE.Mesh(geometry, material);
  textGroup.add(shape);

  shape.position.x = (Math.random() - 0.5) * 5;
  shape.position.y = (Math.random() - 0.5) * 5;
  shape.position.z = (Math.random() - 0.5) * 5;

  const scale = Math.random() / 2;
  shape.scale.set(scale, scale, scale);
  shape.rotation.x = Math.random() * Math.PI;
  shape.rotation.y = Math.random() * Math.PI;

  shapes.push(shape);
}

const createText = (font) => {
  const textGeometry = new THREE.TextGeometry("Hello world!", {
    font,
    size: 0.8,
    height: 0.3,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelOffset: -0.05,
    bevelSegments: 5,
  });
  const text = new THREE.Mesh(textGeometry, material);
  textGeometry.computeBoundingBox();
  textGeometry.center();
  textGroup.add(text);
};
fontLoader.load(
  "https://assets.codepen.io/85648/Luckiest+Guy_Regular.json",
  createText
);

// Lighting
const lightAmbient = new THREE.AmbientLight(0x9eaeff, 1);
scene.add(lightAmbient);

gsap.to(params, {
  rx: degreesToRadians(360),
  ry: degreesToRadians(360),
  z: degreesToRadians(360),
  repeat: -1,
  duration: 20,
  ease: "none",
});

// Draw
const draw = () => {
  textGroup.rotation.x = params.rx;
  textGroup.rotation.y = params.ry;

  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  render(renderer);
};

gsap.ticker.add(draw);

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class BasicScene {
  camera: THREE.PerspectiveCamera = null;
  renderer: THREE.Renderer = null;
  orbitals: OrbitControls = null;
  scene: THREE.Scene = null;
  color = 0xefefef;

  width = window.innerWidth;
  height = window.innerHeight;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 100;
    this.camera.position.y = 0;
    this.camera.position.x = 0;

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("app") as HTMLCanvasElement,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(this.width, this.height);

    BasicScene.addWindowResizing(this.camera, this.renderer);

    this.orbitals = new OrbitControls(this.camera, this.renderer.domElement);

    this.scene.background = new THREE.Color(this.color);
  }

  static addWindowResizing(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer) {
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}


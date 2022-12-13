import { BasicScene } from "./BasicScene";
import { Draw } from "./Draw";
import { Gui } from "./Gui";

const scene = new BasicScene();
const drawer = new Draw(scene.scene);
new Gui(scene, drawer);

function loop() {
  drawer.run();
  scene.camera.updateProjectionMatrix();
  scene.renderer.render(scene.scene, scene.camera);
  scene.orbitals.update();
  requestAnimationFrame(loop);
}

loop();

import { GUI } from "dat.gui";
import { BasicScene } from "./BasicScene";
import { Draw } from "./Draw";

export class Gui {
  gui: GUI;
  constructor(scene: BasicScene, drawer: Draw) {
    this.gui = new GUI();
    this.gui.add(drawer, "size").name("drawing size");
    this.gui.addColor(drawer, "color").name("drawing color");
    this.gui.addColor(scene, "color").name("background color");
  }
}

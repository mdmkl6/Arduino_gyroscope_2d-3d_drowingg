import * as THREE from "three";
import { serial_data } from "./Types";

export class Draw {
  scene: THREE.Scene;
  size: number;
  color: THREE.ColorRepresentation;
  pointer: THREE.Group;
  point: THREE.Vector3;
  p_time: number;

  p_data = { x: 0, y: 0, z: 0 };
  state = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.size = 1;
    this.color = 0x0000ff;
    this.p_time = 0;

    this.pointer = new THREE.Group();
    this.pointer.position.x = 2;
    this.pointer.add(
      new THREE.Mesh(new THREE.SphereGeometry(this.size), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
    );

    this.point = new THREE.Vector3();

    this.scene.add(this.pointer);
  }

  draw_point() {
    const mesh: THREE.Mesh = new THREE.Mesh(
      new THREE.SphereGeometry(this.size),
      new THREE.MeshBasicMaterial({ color: this.color })
    );
    mesh.position.copy(this.point);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }

  prepare_data(data: serial_data) {
    data.x -= this.p_data.x;
    data.y -= this.p_data.y;
    data.z -= this.p_data.z;
  }

  move(data: serial_data, delta_time: number) {
    this.pointer.rotation.z = (data.z * Math.PI) / 180;
    if (Math.abs(data.x) > 0.01) this.pointer.children[0].position.x += data.x * delta_time;
    if (Math.abs(data.y) > 0.01) this.pointer.children[0].position.y += data.y * delta_time;
    this.pointer.children[0].getWorldPosition(this.point);
  }

  run() {
    fetch("/data")
      .then((response) => response.json())
      .then((data: serial_data) => {
        if (data) {
          console.clear();
          console.log(data);
          const delta_time = (data.time - this.p_time) / 2000;
          this.p_time = data.time;
          if (data.button && this.state === 0) {
            this.p_data.x = data.x;
            this.p_data.y = data.y;
            this.p_data.z = data.z;
            this.state = 1;
          } else if (this.state === 1) {
            this.prepare_data(data);
            // console.clear();
            // console.log(data);
            if (data.button) {
              this.move(data, delta_time);
              this.draw_point();
            } else this.state = 0;
          }
        }
      });
  }
}

import { readValue } from "./ui";

class MandelbrotManager {
  real_value = -0.5;
  imag_value = 0;
  zoom = 2;

  width: number;
  height: number;

  rust: any;
  config: any;

  constructor(rust: any, width: number, height: number) {
    this.rust = rust;
    this.height = height;
    this.width = width;

    this.config = this.rust.build_config(width, height);

    this.update_config();
  }

  update_config(): void {
    this.real_value = readValue('real_value');
    this.imag_value = readValue('imag_value');
    this.zoom = readValue('zoom_level');

    this.config.xcenter = this.real_value;
    this.config.ycenter = this.imag_value;
    this.config.zoom = this.zoom;
  }
}

export {
  MandelbrotManager
}

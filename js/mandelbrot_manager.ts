import { readValue, getCanvas } from "./ui";

class MandelbrotManager {
  real_value = -0.5;
  imag_value = 0;
  zoom = 2;

  width: number;
  height: number;

  rust: any;
  config: any;
  image: any;

  constructor(rust: any, width: number, height: number) {
    this.rust = rust;
    this.height = height;
    this.width = width;

    this.config = this.rust.build_config(width, height);
    this.image = this.rust.init_image_data(width, height);

    this.update_config();
  }

  update_config(): void {
    this.real_value = readValue('real_value');
    this.imag_value = readValue('imag_value');
    this.zoom = readValue('zoom_level');

    this.config.set_coordinates(this.real_value, this.imag_value);
    this.config.set_zoom(this.zoom);
  }

  render_mandelbrot(): void {
    this.update_config();
    this.image.reset();
    this.rust.render_mandelbrot(this.config, this.image);
  }

  draw_to_canvas(): void {
    this.image.normalize_image();
    this.image.gamma_correction(1.7);

    const image_pixels = this.image.as_u8();

    const canvas = getCanvas();
    const canvas_context = canvas.getContext('2d');

    if (canvas_context != null) {
      const clamped_array = new Uint8ClampedArray(image_pixels);
      const image_data = new ImageData(clamped_array, this.width, this.height);

      canvas_context.putImageData(image_data, 0, 0);
    }
  }
}

export {
  MandelbrotManager
}

import { readValue, getCanvas } from "./ui";
import { State } from "./state";

class MandelbrotManager {
  real_value = -0.5;
  imag_value = 0;
  zoom = 2;

  escape_radius = 2.0;
  iterations = 256;

  width: number;
  height: number;

  rust: any;
  config: any;
  image: any;

  state: State;

  constructor(rust: any, width: number, height: number) {
    this.rust = rust;
    this.height = height;
    this.width = width;

    this.config = this.rust.build_config(width, height);
    this.image = this.rust.init_image_data(width, height);

    this.state = new State();

    this.update_config();
  }

  update_config(): void {
    this.real_value = readValue('real_value');
    this.imag_value = readValue('imag_value');
    this.zoom = readValue('zoom_level');
    this.escape_radius = readValue('escape_radius_value');
    this.iterations = readValue('iterations_value');

    this.config.set_coordinates(this.real_value, this.imag_value);
    this.config.set_zoom(this.zoom);
    this.config.set_escape_radius(this.escape_radius);
    this.config.set_iterations(this.iterations);
  }

  render_mandelbrot(): void {
    this.update_config();
    this.image.reset();
    this.rust.render_mandelbrot(this.config, this.image);
  }

  render_mandelbrot_line_by_line(): void {
    console.log('render_mandelbrot_line_by_line');
    this.state.set_rendering();
    this.update_config();
    this.image.reset();
    this.render_mandelbrot_line(0, this.state.render_id);
  }

  render_mandelbrot_line(line_number: number, render_id: number): void {
    if (line_number > this.height) {
      this.state.set_finished();
      return;
    }

    if (render_id != this.state.render_id) {
      return;
    }

    const step_size = 7;

    for (let i = 0; i < step_size; i++) {
      this.rust.render_mandelbrot_line(line_number + i, this.config, this.image);
    }

    this.draw_to_canvas();

    setTimeout(() => {
      this.render_mandelbrot_line(line_number + step_size, render_id)
    }, 0);
  }

  draw_to_canvas(): void {
    // TODO: make this work again
    //this.image.normalize_image();
    //this.image.gamma_correction(1.7);

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

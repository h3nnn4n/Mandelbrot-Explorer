import { readValue, getCanvas } from "./ui";
import { State } from "./state";
import { render_int_escape_time, render_binary_real, render_binary_imag } from "./render_modes";
import { Image, Config } from "../pkg/mandelbrot_explorer";
import { RenderConfig, RenderMode } from "./render_config";

class MandelbrotManager {
  real_value = -0.5; imag_value = 0;
  zoom = 2;

  escape_radius = 2.0;
  iterations = 256;

  step_size = 20;
  last_step_size = 20;
  last_rendered_line = 0;

  width: number;
  height: number;

  render_config: RenderConfig;
  current_render_config: RenderConfig;

  rust: any;
  config: Config;
  image: Image;
  image_aa: Image[];
  final_image: Image;
  buffer: Uint8Array;

  state: State;

  constructor(rust: any, width: number, height: number) {
    this.rust = rust;
    this.height = height;
    this.width = width;

    this.rust.init_canvas(width, height);
    this.image = this.rust.init_image_data(width, height);
    this.image_aa = [];
    this.config = this.rust.build_config(width, height);
    this.final_image = this.rust.init_image_data(width, height);

    this.state = new State();
    this.render_config = new RenderConfig();
    this.current_render_config = new RenderConfig();

    this.set_aa(0);

    this.buffer = new Uint8Array(width * height * 4);

    this.update_config();
  }

  set_aa(n_samples: number): void {
    this.config.set_aa(n_samples);
    this.current_render_config.aa_samples = n_samples;
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
    this.state.set_rendering();
    this.update_config();
    this.render_config.render_mode = this.current_render_config.render_mode;
    this.render_config.aa_samples = this.current_render_config.aa_samples;

    for (let i = 0; i < this.render_config.aa_samples; i++) {
      if (i < this.image_aa.length) continue;

      this.image_aa.push(this.rust.init_image_data(this.width, this.height));
    }

    console.assert(this.image_aa.length >= this.render_config.aa_samples);
    console.assert(this.image_aa.length >= this.config.aa_samples);

    this.image.reset();
    for (let i = 0; i < this.render_config.aa_samples; i++) {
      this.image_aa[i].reset();
    }

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

    this.last_rendered_line = line_number;
    this.last_step_size = this.step_size

    const t1 = performance.now();

    for (let i = 0; i < this.step_size; i++) {
      this.rust.render_mandelbrot_line(line_number + i, this.config, this.image);
    }

    for (let aa_index = 0; aa_index < this.render_config.aa_samples; aa_index++) {
      for (let i = 0; i < this.step_size; i++) {
        this.rust.render_mandelbrot_line_aa(line_number + i, this.config, this.image_aa[aa_index]);
      }
    }

    const t_diff = performance.now() - t1;
    const step_size = this.step_size

    if (t_diff > 30 && this.step_size > 2) {
      const step_per_ms = step_size / t_diff;
      this.step_size = Math.ceil(step_per_ms * 20.0);
      if (this.step_size < 2) this.step_size = 2;
    }

    if (t_diff < 20) {
      const step_per_ms = step_size / t_diff;
      this.step_size = Math.ceil(step_per_ms * 20.0);
    }

    this.draw_to_canvas();

    setTimeout(() => {
      this.render_mandelbrot_line(line_number + step_size, render_id)
    }, 0);
  }

  draw_to_canvas(): void {
    let image_pixels;

    switch (this.render_config.render_mode) {
      case RenderMode.INT_ESCAPE_TIME:
        image_pixels = render_int_escape_time(this);
        break;

      case RenderMode.REAL_BINARY:
        image_pixels = render_binary_real(this);
        break;

      case RenderMode.IMAG_BINARY:
        image_pixels = render_binary_imag(this);
        break;
    }

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

import { getCanvas, bindEvents } from "./js/ui";
import { MandelbrotManager } from "./js/mandelbrot_manager";

const width = 800;
const height = 600;

let Rust: any;
let rust_image_data: any;
let mandelbrot_manager: any;

const init = () => {
  bindEvents(render_mandelbrot);

  rust_image_data = Rust.init_image_data(width, height);
  rust_image_data.reset();

  mandelbrot_manager = new MandelbrotManager(Rust, width, height);

  render_mandelbrot();
  draw_to_canvas();
}

function draw_to_canvas() {
  rust_image_data.normalize_image();
  rust_image_data.gamma_correction(1.7);

  const image_pixels = rust_image_data.as_u8();

  const canvas = getCanvas();
  const canvas_context = canvas.getContext('2d');

  if (canvas_context != null) {
    const clamped_array = new Uint8ClampedArray(image_pixels);
    const image_data = new ImageData(clamped_array, width, height);

    canvas_context.putImageData(image_data, 0, 0);
  }
}

function render_mandelbrot() {
  mandelbrot_manager.update_config();

  Rust.render_mandelbrot(mandelbrot_manager.config, rust_image_data);
}

export const load = (): void => {
  (() => import( /* webpackChunkName: "strange_attractor_explorer" */ './pkg/mandelbrot_explorer.js').then(module => {
    Rust = module;
    init();
  }))();
}

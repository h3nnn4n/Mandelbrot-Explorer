import { getCanvas, bindEvents } from "./js/ui";

let Rust: any;
let image_data: any;

const width = 800;
const height = 600;

const init = () => {
  const canvas = getCanvas();

  if (canvas != null) {
    console.log('initial canvas size', canvas.width, canvas.height);
  }

  Rust.init();
  Rust.init_mandelbrot();

  console.log(Rust.a_plus_b(1, 2));

  bindEvents(render_mandelbrot);

  image_data = Rust.init_image_data(width, height);
  image_data.reset();

  render_mandelbrot();

  draw_to_canvas();
}

function draw_to_canvas() {
  image_data.normalize_image();
  //image_data.invert_colors();
  image_data.gamma_correction(1.7);

  const image_pixels = image_data.as_u8();

  const canvas = getCanvas();
  const canvas_context = canvas.getContext('2d');

  if (canvas_context != null) {
    console.log('intialized canvas size', canvas.width, canvas.height);
    const clamped_array = new Uint8ClampedArray(image_pixels);
    const image_data = new ImageData(clamped_array, width, height);

    canvas_context.putImageData(image_data, 0, 0);
  }
}

function render_mandelbrot() {
  console.log('render');
  Rust.render_mandelbrot(image_data);
}

export const load = (): void => {
  (() => import( /* webpackChunkName: "strange_attractor_explorer" */ './pkg/mandelbrot_explorer.js').then(module => {
    Rust = module;
    init();
  }))();
}

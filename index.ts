let Rust: any;
let image_data: any;

const init = () => {
  Rust.init();
  console.log(Rust.a_plus_b(1, 2));
  Rust.init_mandelbrot();

  image_data = Rust.init_image_data(600, 600);
  image_data.reset();

  render_mandelbrot();
  draw_to_canvas();
}

function draw_to_canvas() {
  image_data.normalize_image();
  image_data.invert_colors();
  image_data.gamma_correction(2.7);

  const image_pixels = image_data.as_u8();

  const canvas = getCanvas();
  const canvas_context = canvas.getContext('2d');

  if (canvas_context != null) {
    const clamped_array = new Uint8ClampedArray(image_pixels);
    const image_data = new ImageData(clamped_array, 600, 600);

    canvas_context.putImageData(image_data, 0, 0);
  }
}

function getCanvas() {
  const j_canvas = $('#canvas');
  const canvas = <HTMLCanvasElement>j_canvas[0];
  return canvas;
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

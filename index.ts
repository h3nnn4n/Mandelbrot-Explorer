import { bindEvents } from "./js/ui";
import { MandelbrotManager } from "./js/mandelbrot_manager";

const width = 800;
const height = 600;

let Rust: any;
let mandelbrot_manager: any;

const render_mandelbrot = (): void => {
  mandelbrot_manager.render_mandelbrot();
  mandelbrot_manager.draw_to_canvas();
}

const init = () => {
  mandelbrot_manager = new MandelbrotManager(Rust, width, height);

  bindEvents(render_mandelbrot);

  render_mandelbrot();
}

export const load = (): void => {
  (() => import( /* webpackChunkName: "strange_attractor_explorer" */ './pkg/mandelbrot_explorer.js').then(module => {
    Rust = module;
    init();
  }))();
}

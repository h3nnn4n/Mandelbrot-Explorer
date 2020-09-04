import './scss/app.scss';
import 'bootstrap';

import { bindEvents, setPreset } from "./js/ui";
import { MandelbrotManager } from "./js/mandelbrot_manager";

const width = 800;
const height = 600;

let Rust: any;
let mandelbrot_manager: any;

const render_mandelbrot = (): void => {
  mandelbrot_manager.render_mandelbrot_line_by_line();
}

const init = () => {
  mandelbrot_manager = new MandelbrotManager(Rust, width, height);

  bindEvents(render_mandelbrot);

  setPreset('fullset');

  render_mandelbrot();
}

export const load = (): void => {
  (() => import( /* webpackChunkName: "mandelbrot_explorer" */ './pkg/mandelbrot_explorer.js').then(module => {
    Rust = module;
    init();
  }))();
}

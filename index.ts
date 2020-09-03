import { bindEvents, resetProgressBar } from './js/user_interface';
import { MandelbrotManager } from './js/mandelbrot_manager';

let Rust: any;
let mandelbrot_manager: MandelbrotManager;

const init = () => {
  Rust.init();
  mandelbrot_manager = new MandelbrotManager(Rust);

  bindEvents(render_mandelbrot, find_random_attractor);

  render_mandelbrot();
}

function render_mandelbrot() {
  mandelbrot_manager.update_config();
  mandelbrot_manager.start();

  resetProgressBar();

  render_loop();
}

function find_random_attractor() {
  //let lyap = Rust.init_lyapunov();
  //lyap.find_chaotic_params();

  return [];
}

function render_loop() {
  if (mandelbrot_manager.finished_running() && !mandelbrot_manager.state_control.did_state_change()) {
    return;
  }

  mandelbrot_manager.interpolate_and_render_step()

  setTimeout(() => {
    render_loop();
  }, 0);
}

export const load = (): void => {
  (() => import( /* webpackChunkName: "strange_attractor_explorer" */ './pkg/strange_attractor_explorer.js').then(module => {
    Rust = module;
    init();
  }))();
}

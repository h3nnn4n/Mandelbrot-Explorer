extern crate cfg_if;
extern crate num;
extern crate rand;
extern crate wasm_bindgen;
extern crate web_sys;

mod config;
mod image;
mod mandelbrot;
mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

use image::Image;

cfg_if! {
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub fn init_image_data(width: u32, height: u32) -> Image {
    let canvas = utils::get_canvas();

    canvas.set_width(width.into());
    canvas.set_height(height.into());

    Image::init(width.into(), height.into())
}

#[wasm_bindgen]
pub fn build_config(width: u32, height: u32) -> config::Config {
    utils::console_log("building config");

    let mut config = config::Config::new();

    config.width = width;
    config.height = height;

    config
}

#[wasm_bindgen]
pub fn render_mandelbrot(config: &config::Config, image_data: &mut Image) {
    utils::console_log("rendering mandelbrot set");

    for x in 0..800 {
        for y in 0..600 {
            let c = mandelbrot::get_c(x, y, *config);
            let v = mandelbrot::mandelbrot_point(c,
                                                 config.escape_radius,
                                                 config.iterations) as u8;

            image_data.put_pixel(x as u64, y as u64, [v, v, v]);
        }
    }

    utils::console_log("render finished");
}

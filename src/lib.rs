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
    Image::init(width.into(), height.into())
}

#[wasm_bindgen]
pub fn a_plus_b(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn init_mandelbrot() {
    utils::console_log("init_mandelbrot");
}

#[wasm_bindgen]
pub fn render_mandelbrot(image_data: &mut Image) {
    utils::console_log("render_mandelbrot");
    let config = config::Config::new();

    for y in 0..config.height {
        for x in 0..config.width {
            let c = mandelbrot::get_c(x, y, config);
            let v = mandelbrot::mandelbrot_point(c, config.escape_radius, config.iterations) as u8;

            image_data.put_pixel(x as u64, y as u64, [v, v, v]);
        }

        //if (y + 1) % 25 == 0 {
            //println!("{:4} of {}", (y + 1), config.height);
        //}
    }

    utils::console_log("render_mandelbrot finished");
}

#[wasm_bindgen]
pub fn init() {
    utils::console_log("init");
    let canvas = utils::get_canvas();

    canvas.set_width(600);
    canvas.set_height(600);
}

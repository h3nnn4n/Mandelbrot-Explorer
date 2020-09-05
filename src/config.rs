use wasm_bindgen::prelude::*;
use rand::Rng;
use num::complex::Complex;

use mandelbrot::get_c;

#[wasm_bindgen]
#[derive(Copy, Clone)]
pub struct Config {
    pub xcenter: f64,
    pub ycenter: f64,

    pub zoom: f64,

    pub width: u32,
    pub height: u32,

    pub escape_radius: f64,
    pub iterations: u32,

    pub aa_samples: u32,
    pub x_aa_offset: f64,
    pub y_aa_offset: f64,
}

#[wasm_bindgen]
impl Config {
    pub fn new() -> Config {
        Config {
            // Eventually recieve this as parameters
            xcenter: -0.5,
            ycenter: 0.0,

            zoom: 2.0,

            height: 600,
            width: 800,

            escape_radius: 2.0,
            iterations: 256,

            aa_samples: 0,
            y_aa_offset: 0.0,
            x_aa_offset: 0.0,
        }
    }

    pub fn set_size(&mut self, width: u32, height: u32) {
        self.width = width;
        self.height = height;
    }

    pub fn set_escape_radius(&mut self, radius: f64) {
        self.escape_radius = radius;
    }

    pub fn set_iterations(&mut self, iterations: u32) {
        self.iterations = iterations;
    }

    pub fn set_zoom(&mut self, zoom: f64) {
        self.zoom = zoom;
    }

    pub fn set_coordinates(&mut self, real_value: f64, imag_value: f64) {
        self.xcenter = real_value;
        self.ycenter = imag_value;
    }

    pub fn set_aa(&mut self, aa_samples: u32) {
        self.aa_samples = aa_samples;
        let c1 = get_c(10, 10, *self);
        let c2 = get_c(11, 11, *self);

        self.x_aa_offset = (c2.re - c1.re).abs() / 2.0;
        self.y_aa_offset = (c2.im - c1.im).abs() / 2.0;
    }
}

impl Config {
    pub fn get_aa_offset(&self, c: Complex<f64>) -> Complex<f64> {
        let mut rng = rand::thread_rng();

        Complex {
            re: c.re + rng.gen_range(-self.x_aa_offset, self.x_aa_offset),
            im: c.im + rng.gen_range(-self.y_aa_offset, self.y_aa_offset)
        }
    }
}

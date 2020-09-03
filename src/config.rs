use wasm_bindgen::prelude::*;

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
}

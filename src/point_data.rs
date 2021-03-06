use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PointData {
    pub iterations: u32,
    pub max_iterations: u32,
    pub real: f64,
    pub imaginary: f64,
}

#[wasm_bindgen]
impl PointData {
    pub fn new() -> PointData {
        PointData {
            iterations: 0,
            max_iterations: 0,
            real: 0.0,
            imaginary: 0.0,
        }
    }

    pub fn make_a_copy(&self) -> PointData {
        PointData {
            iterations: self.iterations,
            max_iterations: self.iterations,
            real: self.real,
            imaginary: self.imaginary,
        }
    }
}

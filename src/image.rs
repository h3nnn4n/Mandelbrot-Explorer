use wasm_bindgen::prelude::*;
use point_data::PointData;

#[wasm_bindgen]
pub struct Image {
    data: Vec<u64>,
    point_data: Vec<PointData>,
    pub width: u32,
    pub height: u32,
}

#[wasm_bindgen]
impl Image {
    pub fn init(width: u32, height: u32) -> Image {
        let mut image_data = Image {
            data: vec![],
            point_data: vec![],
            width: width,
            height: height,
        };

        image_data.init_image();

        image_data
    }

    pub fn reset(&mut self) {
        for x in 0..self.width {
            for y in 0..self.height {
                let index = ((y * self.width + x) * 4) as usize;

                for i in 0..3 {
                    self.data[index + i] = 0;
                }

                self.data[index + 3] = 255;
            }
        }
    }

    pub fn normalize_image(&mut self) {
        let mut r = 0;
        let mut g = 0;
        let mut b = 0;

        for x in 0..self.width {
            for y in 0..self.height {
                let index = ((y * self.width + x) * 4) as usize;

                if self.data[index + 0] > r {
                    r = self.data[index + 0];
                }

                if self.data[index + 1] > g {
                    g = self.data[index + 1];
                }

                if self.data[index + 2] > b {
                    b = self.data[index + 2];
                }
            }
        }

        for x in 0..self.width {
            for y in 0..self.height {
                let index = ((y * self.width + x) * 4) as usize;

                self.data[index + 0] =
                    ((self.data[index + 0] as f64 / r as f64) * 255 as f64) as u64;
                self.data[index + 1] =
                    ((self.data[index + 1] as f64 / g as f64) * 255 as f64) as u64;
                self.data[index + 2] =
                    ((self.data[index + 2] as f64 / b as f64) * 255 as f64) as u64;
            }
        }
    }

    pub fn gamma_correction(&mut self, gamma: f64) {
        for x in 0..self.width {
            for y in 0..self.height {
                let index = ((y * self.width + x) * 4) as usize;

                for i in 0..3 {
                    self.data[index + i] =
                        ((self.data[index + i] as f64 / 255.0).powf(1.0 / gamma) * 255.0) as u64;
                }
            }
        }
    }

    pub fn invert_colors(&mut self) {
        for x in 0..self.width {
            for y in 0..self.height {
                let index = ((y * self.width + x) * 4) as usize;

                for i in 0..3 {
                    self.data[index + i] = 255 - self.data[index + i];
                }
            }
        }
    }

    pub fn as_u8(&self) -> Vec<u8> {
        let mut data = Vec::new();

        for y in 0..self.height {
            for x in 0..self.width {
                let index = ((y * self.width + x) * 4) as usize;

                for i in 0..4 {
                    data.push(self.data[index + i] as u8);
                }
            }
        }

        data
    }

    pub fn copy_from(&mut self, other: &Image) {
        for y in 0..self.height {
            for x in 0..self.width {
                let index = ((y * self.width + x) * 4) as usize;
                let pixel = other.get_pixel(x, y);

                for i in 0..4 {
                    self.data[index + i] = pixel[i];
                }
            }
        }
    }

    pub fn get_point(&self, x: u32, y: u32) -> PointData {
        let index = (y * self.width + x) as usize;

        return self.point_data[index].make_a_copy();
    }

    pub fn aa_int_escape_time_merge(&mut self, other: &Image) {
        for y in 0..self.height {
            for x in 0..self.width {
                let index = ((y * self.width + x) * 4) as usize;
                let pixel = other.get_pixel(x, y);

                for i in 0..4 {
                    self.data[index + i] += pixel[i];
                }
            }
        }
    }
}

impl Image {
    pub fn put_pixel(&mut self, x: u32, y: u32, color: [u8; 3]) {
        if x > self.width - 1 {
            return;
        }

        if y > self.height - 1 {
            return;
        }

        let index = ((y * self.width as u32 + x) * 4) as usize;

        for i in 0..3 {
            self.data[index + i] += color[i] as u64;
        }
    }

    pub fn put_point(&mut self, x: u32, y: u32, point_data: PointData) {
        if x > self.width - 1 {
            return;
        }

        if y > self.height - 1 {
            return;
        }

        let index = (y * self.width as u32 + x) as usize;

        self.point_data[index] = point_data;
    }

    pub fn get_pixel(&self, x:  u32, y: u32) -> [u64; 4] {
        let index = ((y * self.width + x) * 4) as usize;
        let mut pixel: [u64; 4] = [0, 0, 0, 0];

        for i in 0..4 {
            pixel[i] = self.data[index + i];
        }

        return pixel;
    }

    fn init_image(&mut self) {
        self.data.clear();
        self.point_data.clear();

        for _ in 0..self.width {
            for _ in 0..self.height {
                self.point_data.push(PointData::new());

                self.data.push(0);
                self.data.push(0);
                self.data.push(0);
                self.data.push(255);
            }
        }
    }
}

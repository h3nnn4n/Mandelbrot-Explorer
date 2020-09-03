extern crate num;
use config::Config;
use num::complex::Complex;


pub fn get_c(x: u32, y: u32, config: Config) -> Complex<f64> {
    let minx = config.xcenter + config.zoom;
    let maxx = config.xcenter - config.zoom;
    let miny = config.ycenter + config.zoom;
    let maxy = config.ycenter - config.zoom;

    let real = minx + (x as f64) * (maxx - minx) / (config.width as f64);
    let imag = miny + (y as f64) * (maxy - miny) / (config.height as f64);

    Complex { re: real, im: imag }
}

pub fn mandelbrot_point(c: Complex<f64>, escape_radius: f64, iterations: u32) -> u32 {
    let mut z = c.clone();

    for i in 0..iterations {
        z = z.powf(2.0) + c;

        if z.norm() > escape_radius {
            return i;
        }
    }

    return 0;
}

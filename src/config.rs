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

impl Config {
    pub fn new() -> Config {
        Config {
            // Eventually recieve this as parameters
            xcenter: -0.74364085,
            ycenter: 0.13182733,

            zoom: 0.00012068 / 8.0,

            width: 800,
            height: 600,

            escape_radius: 2.0,
            iterations: 1024,
        }
    }
}

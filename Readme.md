# Mandelbrot Explorer

A simple Mandelbrot set explorer written in Rust and Typescript.

## How to run

1. Clone this repo
2. Have the [rust toolchain](https://www.rust-lang.org/tools/install) installed
3. Have [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) installed
4. Run `yarn install`. If you dont have it, you can get it [here](https://yarnpkg.com/lang/en/docs/install/)
5. Run `wasm-pack build --release`
6. Run `yarn link` inside the `pkg` folder
7. Run `yarn link "mandelbrot-explorer"` on the project root (this is the project name on the _config.toml_ file)
8. Run `yarn dev-server`
9. Go to `http://localhost:8080/`

## License

Check the _LICENSE_ file for more information.

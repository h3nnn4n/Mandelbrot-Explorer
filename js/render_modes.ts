import { MandelbrotManager } from './mandelbrot_manager';

function render_int_escape_time(context: MandelbrotManager): Uint8Array {
  context.final_image.copy_from(context.image);
  context.final_image.normalize_image();
  context.final_image.gamma_correction(1.7);

  return context.final_image.as_u8();
}

function render_binary(context: MandelbrotManager): Uint8Array {
  const data = new Uint8Array(context.image.width * context.image.height * 4);

  for (let y = 0; y < context.image.height; y++) {
    for (let x = 0; x < context.image.width; x++) {
      const point = context.image.get_point(x, y);
      const index = (y * context.width + x) * 4;

      let pixel_value = 255;

      if (point.real > 0 || point.iterations == 0)
        pixel_value = 0;

      for (let i = 0; i < 3; i++) {
        data[index + i] = pixel_value;
      }

      data[index + 3] = 255;
    }
  }

  return data;
}

export {
  render_int_escape_time,
  render_binary
}

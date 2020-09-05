import { MandelbrotManager } from './mandelbrot_manager';

function render_int_escape_time(context: MandelbrotManager): Uint8Array {
  context.final_image.copy_from(context.image);
  context.final_image.normalize_image();
  context.final_image.gamma_correction(1.7);

  return context.final_image.as_u8();
}

function render_binary_real(context: MandelbrotManager): Uint8Array {
  const start_line = context.last_rendered_line;
  const end_line = start_line + context.last_step_size;

  for (let y = start_line; y < end_line; y++) {
    if (y > context.height - 1) continue;

    for (let x = 0; x < context.image.width; x++) {
      const point = context.image.get_point(x, y);
      const index = (y * context.width + x) * 4;

      let pixel_value = 255;

      if (point.real > 0 || point.iterations == 0)
        pixel_value = 0;

      for (let i = 0; i < 3; i++) {
        context.buffer[index + i] = pixel_value;
      }

      context.buffer[index + 3] = 255;
    }
  }

  return context.buffer;
}

function render_binary_imag(context: MandelbrotManager): Uint8Array {
  const start_line = context.last_rendered_line;
  const end_line = start_line + context.last_step_size;

  for (let y = start_line; y < end_line; y++) {
    if (y > context.height - 1) continue;

    for (let x = 0; x < context.image.width; x++) {
      const point = context.image.get_point(x, y);
      const index = (y * context.width + x) * 4;

      let pixel_value = 255;

      if (point.imaginary > 0 || point.iterations == 0)
        pixel_value = 0;

      for (let i = 0; i < 3; i++) {
        context.buffer[index + i] = pixel_value;
      }

      context.buffer[index + 3] = 255;
    }
  }

  return context.buffer;
}

function render_binary_mix(context: MandelbrotManager): Uint8Array {
  const start_line = context.last_rendered_line;
  const end_line = start_line + context.last_step_size;

  for (let y = start_line; y < end_line; y++) {
    if (y > context.height - 1) continue;

    for (let x = 0; x < context.image.width; x++) {
      const point = context.image.get_point(x, y);
      const index = (y * context.width + x) * 4;

      let pixel_value = 255;

      if (point.real > 0 || point.iterations == 0)
        pixel_value = 0;

      if (point.imaginary > 0 && point.iterations != 0)
        pixel_value = 127;

      for (let i = 0; i < 3; i++) {
        context.buffer[index + i] = pixel_value;
      }

      context.buffer[index + 3] = 255;
    }
  }

  return context.buffer;
}

export {
  render_int_escape_time,
  render_binary_real,
  render_binary_imag,
  render_binary_mix
}

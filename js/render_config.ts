enum RenderMode {
  INT_ESCAPE_TIME,
  REAL_BINARY,
  IMAG_BINARY
}

class RenderConfig {
  render_mode: RenderMode;
  aa_samples = 0;

  constructor() {
    this.render_mode = RenderMode.INT_ESCAPE_TIME;
    //this.render_mode = RenderMode.REAL_BINARY;
  }

  set_mode(mode_name: string): void {
    switch (mode_name) {
      case 'int_escape_time':
        this.render_mode = RenderMode.INT_ESCAPE_TIME;
        break;

      case 'real_binary':
        this.render_mode = RenderMode.REAL_BINARY;
        break;

      case 'imag_binary':
        this.render_mode = RenderMode.IMAG_BINARY;
        break;
    }
  }
}

export {
  RenderConfig,
  RenderMode
}

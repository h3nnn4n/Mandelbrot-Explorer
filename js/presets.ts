class Preset {
  real: number;
  imag: number;
  zoom: number;
  iterations: number;

  constructor(real: number, imag: number, zoom: number, iterations = 256) {
    this.real = real;
    this.imag = imag;
    this.zoom = zoom;
    this.iterations = iterations;
  }
}

const presets = new Map<string, Preset>();
presets.set('none', new Preset(-0.5, 0.0, 2.0));
presets.set('fullset', new Preset(-0.5, 0.0, 2.0));
presets.set('seahorse', new Preset(-0.743030, 0.126433, 0.0165, 512));

function getPreset(name: string): Preset | undefined {
  const preset = presets.get(name);

  return preset;
}

export {
  getPreset
}

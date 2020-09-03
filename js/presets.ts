class Preset {
  real: number;
  imag: number;
  zoom: number;

  constructor(real: number, imag: number, zoom: number) {
    this.real = real;
    this.imag = imag;
    this.zoom = zoom;
  }
}

const presets = new Map<string, Preset>();
presets.set('fullset', new Preset(-0.5, 0.0, 2.0));
presets.set('seahorse', new Preset(0.126433, -0.743030, 0.0165));

function getPreset(name: string): Preset | undefined {
  const preset = presets.get(name);

  return preset;
}

export {
  getPreset
}

enum Mode {
    STOPPED,
    RENDERING,
    KILL,
    FINISHED
}

class State {
  mode: Mode

  render_id: number;

  constructor() {
    this.mode = Mode.STOPPED;
    this.render_id = 0;
  }

  set_rendering(): void {
    this.render_id += 1;
    this.mode = Mode.RENDERING;
  }

  set_finished(): void {
    this.mode = Mode.FINISHED;
  }
}

export {
  State
}

import * as $ from 'jquery';
import * as AColorPicker from 'a-color-picker';

function bindEvents(render_callback: any): void {
    $('#render').click(render_callback);
    $('#download').click(downloadCanvas);
}

function downloadCanvas() {
    const dataURL = getCanvas().toDataURL('image/png');
    $('#download').attr('href', dataURL);
    $('#download').attr('download', 'image.png');
}

function getCanvas(): HTMLCanvasElement {
  const j_canvas = $('#canvas');
  const canvas = <HTMLCanvasElement>j_canvas[0];

  return canvas;
}

function readValue(name: string): number {
    const value = $('#' + name).val();

    return Number(value);
}

function readColor(name: string): number[] {
    const value = <string>$('#' + name).val();
    const parsed = <number[]><unknown>AColorPicker.parseColor(value, "rgb");

    return parsed;
}

export {
  getCanvas,
  readValue,
  readColor,
  bindEvents
}

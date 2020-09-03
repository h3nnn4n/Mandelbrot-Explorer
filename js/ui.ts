import * as $ from 'jquery';
import * as AColorPicker from 'a-color-picker';

import { getPreset } from "./presets";

function bindEvents(render_callback: any): void {
    $('#render').click(render_callback);
    $('#download').click(downloadCanvas);
    $('[data-value]').click(setPreset);
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

function setValue(name: string, number: number): void {
    $('#' + name).val(number);
}

function readColor(name: string): number[] {
    const value = <string>$('#' + name).val();
    const parsed = <number[]><unknown>AColorPicker.parseColor(value, "rgb");

    return parsed;
}

function setPreset(event: any): void {
  const preset_key = event.target.dataset.value;
  const data = getPreset(preset_key);

  if (data === undefined) return;

  setValue('real_value', data.real);
  setValue('imag_value', data.imag);
  setValue('zoom_level', data.zoom);
}

export {
  getCanvas,
  readValue,
  readColor,
  bindEvents
}

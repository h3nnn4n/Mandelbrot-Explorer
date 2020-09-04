import * as $ from 'jquery';
import * as AColorPicker from 'a-color-picker';

import { getPreset } from "./presets";

function bindEvents(render_callback: any): void {
    $('#render').click(render_callback);
    $('#download').click(downloadCanvas);
    $('[data-value]').click(handlePresetEvent);
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

function handlePresetEvent(event: any): void {
  const preset_name = event.target.dataset.value;

  setPreset(preset_name);
}

function setPreset(preset_name: string): void {
  const data = getPreset(preset_name);

  if (data === undefined) return;

  const name = $(`[data-value="${preset_name}"`).text();
  $('#selected_preset').text(name);

  setValue('real_value', data.real);
  setValue('imag_value', data.imag);
  setValue('zoom_level', data.zoom);
  setValue('iterations_value', data.iterations);
}

export {
  getCanvas,
  readValue,
  readColor,
  bindEvents,
  setPreset
}

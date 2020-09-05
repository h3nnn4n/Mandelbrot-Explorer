import * as $ from 'jquery';
import * as AColorPicker from 'a-color-picker';

import { getPreset } from "./presets";
import { MandelbrotManager } from './mandelbrot_manager';

function bindEvents(mandelbrot_manager: MandelbrotManager): void {
    $('#render').click(() => mandelbrot_manager.render_mandelbrot_line_by_line());
    $('#download').click(downloadCanvas);
    $('[data-value][data-action="preset"').click(handlePresetEvent);
    $('[data-action="render_mode"').click(() => handleRenderModeEvent(mandelbrot_manager));
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

function handleRenderModeEvent(mandelbrot_manager: MandelbrotManager): void {
  // Hack to get around type checking since I am dumb and do not know how to
  // tell typescript where this function comes from
  const modal: any = $('#render_mode_modal');
  const modal_form = $('[data-target="render_mode_modal"]');
  const selected_mode_name = modal_form.find('input[name="inlineRadioOptions"]:checked').val();

  if (selected_mode_name !== undefined) {
    if (typeof selected_mode_name === 'string') {
      mandelbrot_manager.current_render_config.set_mode(selected_mode_name);
    }
  }

  const n_aa_samples = $('#antialiasing_factor');

  if (n_aa_samples !== undefined) {
    const value = n_aa_samples.val();

    if (value !== undefined) {
      if (typeof value == "number") {
        mandelbrot_manager.set_aa(value);
      } else if (typeof value == "string") {
        if (value.length > 0) {
          mandelbrot_manager.set_aa(parseInt(value));
        }
      }
    }
  }

  modal.modal('hide');
}

export {
  getCanvas,
  readValue,
  readColor,
  bindEvents,
  setPreset
}

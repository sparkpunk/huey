// MODULES and IMPORTS
import chroma from 'chroma-js';
import * as names from './names';
import Color from './color';

// MAIN FUNCTION
export default function makePalette(color, hues, tints, mode) {
  var colors = buildColorWheel(color, hues, mode);
  var obj = {};
  colors.forEach(c => {
    const color = new Color(c);
    const hue_arr = color.getHue(mode);
    const name = getColorName(hue_arr[1])
    const scale = buildColorScale(color, mode, tints);

    obj[name] = scale;
  })
  return obj
}

function buildColorWheel(c, num, mode) {
  var color = new Color(c);
  var hue = color.getHue(mode);

  var wheel = [];
  for(var i = 0; i < num; i++) {
    var spokes = 360 / num;
    var current = spokes * i;
    var new_hue = hue[1] + current;
    if(new_hue >= 360) {
      new_hue -= 360;
    }
    var new_color = chroma(color.hex).set(hue[0] + ".h", new_hue);
    wheel.push(chroma(new_color).hex());
  }
  return wheel;
}

function buildColorScale(color, mode, length) {
  var white, black, domain;
  if(mode === "hsi") {
    white = chroma.hsi(color.hsi_h, 0.1, 0.99).hex();
    black = chroma.hsi(color.hsi_h, 0.99, 0.1).hex();
    domain = [ 0, color.hsi_i, 1 ];
  } else if(mode === "hsl") {
    white = chroma.hsi(color.hsl_h, 0.08, 0.99).hex();
    black = chroma.hsi(color.hsl_h, 0.99, 0.08).hex();
    domain = [ 0, color.hsl_l, 1 ];
  } else if(mode === "hcl") {
    white = chroma.hcl(color.hcl_h, 10, 95).hex();
    black = chroma.hcl(color.hcl_h, 50, 5).hex();
    domain = [ 0, color.hcl_l, 100 ];
  } else if(mode === "hsv") {
    white = chroma.hcl(color.hsv_h, 10, 95).hex();
    black = chroma.hcl(color.hsv_h, 50, 5).hex();
    domain = [ 0, color.hsv_v, 1 ];
  } else if(mode === "lab") {
    white = chroma.hcl(color.hsv_h, 10, 95).hex();
    black = chroma.hcl(color.hsv_h, 50, 5).hex();
    domain = [ 0, color.hsv_v, 1 ];
  } else if(mode === "lrgb") {
    white = chroma.hcl(color.hsv_h, 10, 95).hex();
    black = chroma.hcl(color.hsv_h, 50, 5).hex();
    domain = [ 0, color.hsv_v, 1 ];
  }

  var color_scale = chroma.scale([white, color.hex, black])
    .domain(domain)
    .correctLightness()
    .gamma(0.5)
    .mode(mode)
    .colors(length);

  return color_scale;
}

function getColorName(hue) {
  var current = 0;
  var arr = Object.entries(names);

  for(var i = 0; i < arr.length; i++) {
    var defender = current;
    var challenger = arr[i][1];

    if(Math.abs(defender - hue) > Math.abs(challenger - hue)) {
      current = challenger;
    }
  }
  return getKeyByValue(names, current);
}

function getKeyByValue(obj, val) {
  return Object.keys(obj).find(key => obj[key] === val);
}
// MODULES and IMPORTS
import chroma from 'chroma-js';
import * as names from './names';
import Color from './color';

// MAIN FUNCTION
export default function makePalette(color, hues, tints, mode) {
  var colors = buildColorWheel(color, hues, mode);
  var obj = {};
  colors.forEach(c => {
    var color = new Color(c);
    var hue_arr = color.getHue(mode);
    var hue_val = hue_arr[1];
    var name = getColorName(hue_val);
    var scale = buildColorScale(color, mode, tints);

    obj[name] = scale;
  })
  return obj
}

function buildColorWheel(c, num, mode) {
  // TOOD: LOSING 1 HUE ON LUMINANCE #91f939
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
  var domain;
  var white = chroma(254.5, 254.5, 254.5, 'rgb');
  var black = chroma('black');
  if(mode === "hsi") {
    black = chroma(color.hsi_h, 100, .01, 'hsv');
    domain = [ 0, color.hsi_i, 1 ];
  } else if(mode === "hsl") {
    white = chroma(color.hsl_h, color.hsl_s, 1, 'hsl');
    domain = [ 0, color.hsl_l, 1 ];
  } else if(mode === "hcl") {
    white = chroma(color.hcl_h, color.hcl_c / 8, 100, 'hcl');
    domain = [ 0, color.hcl_l, 100 ];
  } else if(mode === "hsv") {
    black = chroma(color.hsv_h, 100, .02, 'hsv');
    domain = [ 0, color.hsv_v, 1 ];
  } else if(mode === "lab") {
    domain = [ 0, color.hsv_v, 1 ];
  } else if(mode === "lrgb") {
    domain = [ 0, color.hsv_v, 1 ];
  }

  var color_scale = chroma.scale([white, color.hex, black])
    .domain(domain)
    .correctLightness()
    .mode(mode)
    .colors(length + 2);

  color_scale.pop();
  color_scale.shift();

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
// MODULES and IMPORTS
import chroma from 'chroma-js';
import Color from './color';

function colorWheel(num, color) {
  // set space between each hue family
  var degree_step = 360 / num;
  // Chroma-fy the original hex to get color makeup
  color = new Color(color);

  return Array.from({length: num}).map((n, i) => {
    // Always return the original brand color
    if(i == 0) return color.hex;

    var hue = color.hue;
    var saturation = color.saturation;
    var value = color.value;
    // var intensity = color.intensity;

    var local_hue = hue;
    // Step around the color wheel at regular intervals
    if(i != 0) {
      local_hue = hue + (degree_step * i);
      local_hue = local_hue < 360 ? local_hue : local_hue - 360;
    }
    // Craft a new color with similar luminance as input color
    return chroma(local_hue, saturation, value, 'hsv').hex();
    // return chroma(local_hue, saturation, intensity, 'hsi').hex();
  });
}
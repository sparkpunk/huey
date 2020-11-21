// MODULES
import chroma from 'chroma-js';

export class Color {

  constructor(c) {
    this.hex = chroma(c).hex();
    this.hue = this.getHue(c);
    this.intensity = this.getIntensity(c);
    this.khroma = this.getChroma(c);
    this.lightness = this.getLightness(c);
    this.lumi = this.getLuminance(c);
    this.saturation = this.getSaturation(c);
    this.value = this.getValue(c);
  }

  getChroma(color) {
    return chroma(color).get('hcl.c');
  }

  getHue(color) {
    return chroma(color).get('hsi.h');
  }

  getIntensity(color) {
    return chroma(color).get('hsi.i');
  }

  getLuminance(color) {
    return chroma(color).luminance();
  }

  getLightness(color) {
    return chroma(color).get('hsl.l');
  }

  getSaturation(color) {
    return chroma(color).get('hsv.s');
  }

  getValue(color) {
    return chroma(color).get('hsv.v');
  }
}
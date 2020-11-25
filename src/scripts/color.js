// MODULES
import chroma from 'chroma-js';

export default class Color {

  constructor(c) {
    this.hcl_h = chroma(c).get('hcl.h'); // **
    this.hcl_c = chroma(c).get('hcl.c');
    this.hcl_l = chroma(c).get('hcl.l');

    this.hsl_h = chroma(c).get('hsl.h');
    this.hsl_s = chroma(c).get('hsl.s');
    this.hsl_l = chroma(c).get('hsl.l');

    this.hsi_h = chroma(c).get('hsi.h');
    this.hsi_s = chroma(c).get('hsi.s');
    this.hsi_i = chroma(c).get('hsi.i');

    this.hsv_h = chroma(c).get('hsv.h');
    this.hsv_s = chroma(c).get('hsv.s');
    this.hsv_v = chroma(c).get('hsv.v');

    this.hex = chroma(c).hex();
    this.hsl = chroma(c).hsl();
    this.rgb = chroma(c).rgb();
  }

  getHue(arg) {
    if(arg === "hsl") {
      return [ "hsl", this.hsl_h ];
    } else if(arg === "hcl") {
      return [ "hcl", this.hcl_h ];
    } else if(arg === "hsi") {
      return [ "hsi", this.hsi_h ];
    } else if(arg === "hsv") {
      return [ "hsv", this.hsv_h ];
    } else {
      return [ "hsl", this.hsl_h ];
    }
  }
}
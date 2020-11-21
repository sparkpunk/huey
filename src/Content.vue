<template>
  <div class="debug flex flex-col absolute inset-0 left-0 w-64 overflow-y-scroll p-10">
    <div class="w-full h-full">
      <swatch-box v-for="color in wheel"
        :key="color"
        :color="color"
        class="w-12 h-12 mb-2 last:mb-0" />
    </div>
  </div>
</template>

<script>
import chroma from 'chroma-js';
// COMPONENTS
import SwatchBox from './components/SwatchBox';

class Color {

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

export default {
  name: "Content",
  components: [
    SwatchBox,
  ],
  props: {
    source: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      wheel: colorWheel(this.source.hues, this.source.hex),
    };
  },
};
</script>
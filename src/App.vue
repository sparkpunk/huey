<template>
  <sidebar :hex="hex"
    :hues="hues"
    :tints="tints"
    :scale="scale"
    :colors="colors" />
  <workspace :palette="palette"
    class="relative flex flex-col w-auto h-screen overflow-scroll ml-64 p-8" />
</template>

<script>
// MODULES
import chroma from 'chroma-js';
// COMPONENTS
import Sidebar from './Sidebar';
import Workspace from './Workspace';
// SCRIPTS
import colorWheel from './scripts/palette';

export default {
  name: "App",
  components: {
    Sidebar,
    Workspace
  },
  data() {
    return {
      colors: helix,
      hex: helix[3],
      hues: hues,
      tints: tints,
      scale: [
        {
          name: "Intensity",
          value: 'intensity',
          checked: true,
        },
        {
          name: "Lightness",
          value: 'lightness',
          checked: false,
        },
        {
          name: "Luminosity",
          value: 'lumi',
          checked: false,
        },
      ],
      palette: palette
    };
  },
  methods: {
    updateWheel() {
      var { hex, hues, tints, scale } = this;
      var checked = scale.filter(i => i.checked == true)[0];
      var { value } = checked;
      this.palette = colorWheel(hex, hues, tints, value);
    },
    handleInput(obj) {
      var { name, value } = obj;
      this[name] = value;
      this.updateWheel();
    },
    handleRadio(e) {
      var { value } = e.target;
      var scale = this.scale;
      scale.forEach(i => i.checked = i.value == value ? true : false)
      this.scale = scale;
      this.updateWheel();
    }
  },
  provide() {
    return {
      handleInput: this.handleInput,
      handleRadio: this.handleRadio,
    }
  }
};
// Get random colors
const degree = Math.floor(Math.random() * 360) + 1
const helix = chroma.cubehelix()
  .start(degree)
  .rotations(1/2)
  .hue([1, 1])
  .lightness([0.8, 0.6])
  .scale()
  .colors(6);

var hues = 10;
var tints = 10;
var palette = colorWheel(helix[3], hues, tints, 'intensity');
</script>
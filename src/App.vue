<template>
  <sidebar :color="color"
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
import makePalette from './scripts/palette';

export default {
  name: "App",
  components: {
    Sidebar,
    Workspace
  },
  data() {
    return {
      colors: colors,
      color: colors[1], // helix[3],
      hues: hues,
      tints: tints,
      scale: scale,
      palette: makePalette(colors[1], hues, tints, value)
    };
  },
  methods: {
    updatePalette() {
      var { color, hues, tints, scale } = this;
      var checked = scale.filter(i => i.checked == true)[0];
      var { value } = checked;
      this.palette = makePalette(color, hues, tints, value);
    },
    handleInput(obj) {
      var { name, value } = obj;
      this[name] = value;
      this.updatePalette();
    },
    handleRadio(e) {
      var { value } = e.target;
      this.scale.forEach(i => i.checked = i.value == value ? true : false)
      this.updatePalette();
    },
    rollTheDice() {
      var colors = randomColors();
      var color = colors[1];
      this.colors = colors;
      this.color = color;
      this.updatePalette();
    }
  },
  provide() {
    return {
      rollTheDice: this.rollTheDice,
      handleInput: this.handleInput,
      handleRadio: this.handleRadio,
    }
  }
};

function randomColors() {
  var random = chroma.random();
  var color_1 = chroma(random).set('hsl.l', 0.9)
  var color_2 = chroma(random).set('hsl.l', 0.6)
  var color_3 = chroma(random).set('hsl.l', 0.3)
  return [ color_1, color_2, color_3 ];
}

var colors = randomColors();
var hues = 10;
var tints = 10;
var scale = [
  {
    name: "Default",
    value: 'lrgb',
    checked: false,
  },
  {
    name: "Intensity",
    value: 'hsi',
    checked: false,
  },
  {
    name: "LAB",
    value: 'lab',
    checked: false,
  },
  {
    name: "Luminance",
    value: 'hcl',
    checked: true,
  },
  {
    name: "Lightness",
    value: 'hsl',
    checked: false,
  },
  {
    name: "Value",
    value: 'hsv',
    checked: false,
  },
];
var { value } = scale.filter(i => i.checked == true)[0];
</script>
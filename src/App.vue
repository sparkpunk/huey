<template>
  <sidebar :color="color"
    :hues="hues"
    :tints="tints"
    :scale="scale"
    :colors="colors" />
  <workspace :palette="palette"
    :showModal="showModal"
    class="absolute flex flex-col w-auto h-full overflow-scroll ml-56 p-8" />
  <!-- TODO: Componentize Modal and WCAG Table -->
  <div v-if="showModal" class="fixed inset-0 flex flex-col items-center justify-center p-8">
    <div class="absolute inset-0 bg-gray-900 opacity-90"></div>
    <div class="relative z-10 overflow-y-auto w-full h-auto p-12 bg-white rounded-xl shadow-xl">
      <div class="absolute top-0 right-0 w-16 h-16">
        <button @click="{showModal = false; showDetails = false}"
          class="flex items-center justify-center w-full h-full overflow-y-auto text-lg font-semibold text-gray-500">✕</button>
      </div>
      <div class="flex items-center mb-8">
        <h1 class="mr-16 mb-2 text-2xl font-semibold text-gray-900">WCAG Contrast Check</h1>
        <label class="flex align-items mr-1 text-xs font-semibold" for="showDetails">Show text/background values</label>
        <input class="w-4 h-4 mt-px" id="showDetails" type="checkbox" @change="showDetails = !showDetails" />
      </div>
      <div class="flex flex-col w-full h-auto">
        <div v-for="(item, c) in contrast"
          :key="item"
          class="flex-grow-1 w-full h-16 text-xs border-b last:border-b-0 border-white"
          :style="{background: item.background}">
          <div class="flex flex-row-reverse h-full">
            <div v-for="(item, i) in contrast" :key="i"
            class="relative p-1 text-3xs font-semibold border-r first:border-r-0 border-px border-white"
            :style="{
              width: `${100 / (contrast.length)}%`,
              color: item.color
              }">
              <div class="absolute top-0 left-0 m-1 py-px px-1"
                :style="{color: item.color, background: contrast[c].background}">
                <p>{{ getContrast(item.color, contrast[c].background).contrast }}</p>
              </div>
              <div v-if="getContrast(item.color, contrast[c].background).label != undefined"
                class="absolute top-0 right-0 m-1 py-px px-1 rounded-sm shadow"
                :style="{color: contrast[c].background, background: item.color}">
                <p class="">{{ getContrast(item.color, contrast[c].background).label }}</p>
              </div>
              <div v-show="showDetails"
                class="absolute bottom-0 m-1 font-normal">
                <p>T: {{ item.color }}</p>
                <p>B: {{ contrast[c].background }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// MODULES
import chroma from 'chroma-js';
// COMPONENTS
import Sidebar from './Sidebar';
import Workspace from './Workspace';
// SCRIPTS
import makePalette from './scripts/palette';
import makeContrast from './scripts/contrast';

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
      palette: makePalette(colors[1], hues, tints, value),
      contrast: contrast,
      showModal: false,
      showDetails: false,
    };
  },
  methods: {
    getContrast(color_1, color_2) {
      var label;
      var contrast = chroma.contrast(color_1, color_2).toFixed(2);
      if(contrast >= 3 && contrast < 4.5) label = "AA18";
      if(contrast >= 4.5 && contrast < 7) label = "AA";
      if(contrast >= 7) label = "AAA";
      return {
        label: label,
        contrast: contrast,
      }
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
    },
    showContrast(hue) {
      this.showModal = !this.showModal;
      this.contrast = makeContrast(hue);
    },
    updatePalette() {
      var { color, hues, tints, scale } = this;
      var checked = scale.filter(i => i.checked == true)[0];
      var { value } = checked;
      this.palette = makePalette(color, hues, tints, value);
    },
  },
  provide() {
    return {
      handleInput: this.handleInput,
      handleRadio: this.handleRadio,
      rollTheDice: this.rollTheDice,
      showContrast: this.showContrast,
    }
  }
};

function randomColors() {
  var random = chroma.random();
  var color_1 = chroma(random).set('hsl.l', 0.9).hex()
  var color_2 = chroma(random).set('hsl.l', 0.6).hex()
  var color_3 = chroma(random).set('hsl.l', 0.3).hex()
  return [ color_1, color_2, color_3 ];
}

var colors = randomColors();
var contrast = [ "Hello", "Goodbye" ];
var hues = 8;
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
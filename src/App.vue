<template>
  <sidebar :color="color"
    :hues="hues"
    :tints="tints"
    :scale="scale"
    :colors="colors" />
  <workspace :palette="palette"
    :showModal="showModal"
    class="relative flex flex-col w-auto h-screen overflow-scroll ml-56 p-8" />
  <div v-if="showModal" class="fixed inset-0 flex flex-col items-center justify-center p-0">
    <div class="absolute inset-0 bg-gray-900 opacity-90"></div>
    <div class="relative z-10 w-full h-full p-16 bg-white rounded-xl shadow-xl">
      <div class="absolute top-0 right-0 w-16 h-16">
        <button @click="showModal = false"
          class="flex items-center justify-center w-full h-full text-xs font-semibold text-gray-700">Close</button>
      </div>
      <div class="flex flex-col w-full h-full">
        <div v-for="(item, c) in contrast"
          :key="item"
          class="flex-grow-1 w-full h-full text-xs"
          :style="{background: item.background}">
          <div class="flex flex-row-reverse h-full">
            <div v-for="(item, i) in contrast" :key="i"
            class="relative h-full p-1 text-2xs font-semibold"
            :style="{
              width: `${100 / (contrast.length)}%`,
              color: item.color
              }">
              <p class="">{{ item.color }} on {{ contrast[c].background }}</p>
              <p class="">
                <span>{{ getContrast(item.color, contrast[c].background).contrast }}</span>
                <span v-if="getContrast(item.color, contrast[c].background).label != undefined"> / {{ getContrast(item.color, contrast[c].background).label }}</span>
              </p>
            </div>
          </div>
          <!-- <div v-for="(item, i) in contrast"
          :key="i"
          class="flex items-end flex-grow-1 w-full h-full debug"
          :style="{
            color: item.color,
            background: item.color != item.background}">
            <span>{{ item.contrast }}</span>
          </div> -->
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
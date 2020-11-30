<template>
  <sidebar :color="color"
    :hues="hues"
    :tints="tints"
    :scale="scale"
    :colors="colors" />
  <workspace :color="color"
    :palette="palette"
    :showModal="showModal" />
  <modal v-if="showModal"
    :name="modalName"
    :title="modalTitle"
    :content="modalData"
    :height="windowHeight"></modal>
</template>

<script>
// MODULES
import chroma from 'chroma-js';
// COMPONENTS
import Modal from './Modal';
import Sidebar from './Sidebar';
import Workspace from './Workspace';
// SCRIPTS
import makePalette from './scripts/palette';
import makeContrast from './scripts/contrast';

export default {
  name: "App",
  components: [
    Modal,
    Sidebar,
    Workspace
  ],
  data() {
    return {
      colors: colors,
      color: colors[1],
      hues: hues,
      tints: tints,
      scale: scale,
      palette: palette,
      contrast: contrast,
      showModal: false,
      modalData: null,
      modalName: '',
      modalTitle: '',
      windowHeight: 0,
    };
  },
  methods: {
    getCode(e) {
      this.modalData = this.palette;
      this.modalName = 'code';
      this.modalTitle = 'Get Code';
      this.windowHeight = this.getWindowHeight(e);
      this.showModal = !this.showModal;
    },
    getWindowHeight(e) {
      return (e.view.window.innerHeight / 16) + 'rem';
    },
    handleInput(obj) {
      var { name, value } = obj;
      this[name] = value;
      this.updatePalette();
    },
    handleRadio(e) {
      var { value } = e.target;
      this.updateScale(value);
      this.updatePalette();
    },
    handleSelect(e) {
      var { value } = e.target;
      this.updateScale(value);
      this.updatePalette();
    },
    rollTheDice() {
      var colors = randomColors();
      var color = colors[1];
      this.colors = colors;
      this.color = color;
      this.tints = randomNumber(12);
      this.hues = randomNumber(12);
      this.updatePalette();
    },
    showContrast(hue, e) {
      this.modalData = makeContrast(hue);
      this.modalName = 'contrast';
      this.modalTitle = 'WCAG Contrast Chart';
      this.windowHeight = this.getWindowHeight(e);
      this.showModal = !this.showModal;
    },
    toggleModal() {
      return this.showModal = !this.showModal;
    },
    updatePalette() {
      var { color, hues, tints, scale } = this;
      var checked = scale.filter(i => i.checked == true)[0];
      var { value } = checked;
      this.palette = makePalette(color, hues, tints, value);
    },
    updateScale(value) {
      return this.scale.forEach(i => i.checked = i.value === value ? true : false);
    },
  },
  computed: {

  },
  provide() {
    return {
      getCode: this.getCode,
      handleInput: this.handleInput,
      handleRadio: this.handleRadio,
      handleSelect: this.handleSelect,
      rollTheDice: this.rollTheDice,
      showContrast: this.showContrast,
      toggleModal: this.toggleModal,
    }
  },
};

function randomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomColors() {
  var random = chroma.random();
  var color_1 = chroma(random).set('hsl.l', 0.9).hex()
  var color_2 = chroma(random).set('hsl.l', 0.6).hex()
  var color_3 = chroma(random).set('hsl.l', 0.3).hex()
  return [ color_1, color_2, color_3 ];
}

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
var colors = randomColors();
var contrast = null;
var hues = 8;
var tints = 10;
var palette = makePalette(colors[1], hues, tints, value);
</script>
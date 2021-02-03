<template>
  <sidebar :color="color"
    :hues="hues"
    :tints="tints"
    :scale="scale"
    :colors="colors"
    :colorblind="colorblind" />
  <workspace :color="color"
    :palette="palette"
    :showModal="showModal" />
  <modal v-if="showModal"
    :color="color"
    :name="modalName"
    :title="modalTitle"
    :content="modalData"
    :height="windowHeight" />
</template>

<script>
// MODULES
import chroma from 'chroma-js';
import blinder from '@hexorialstudio/color-blinder';
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
      color: colors[1],
      colorblind: colorblind,
      colors: colors,
      hues: 8,
      tints: 10,
      scale: scale,
      palette: palette,
      palette_colors: palette,
      palette_colorblind: palette,
      contrast: contrast,
      showModal: false,
      modalContent: '',
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
      var { id, value } = e.target;
      this.updateScale(id, value);
      this.updatePalette();
    },
    rollTheDice() {
      var colors = tinyScale();
      var color = colors[1];
      this.colors = colors;
      this.color = color;
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
      var { color, hues, tints, scale, colorblind } = this;

      var scale_mode = scale.filter(i => i.checked == true)[0];
      var scale_value = scale_mode.value;

      var blind_mode = colorblind.filter(i => i.checked == true)[0];
      var blind_value = blind_mode.value;

      this.palette_colors = makePalette(color, hues, tints, scale_value);

      if(blind_value != "None") {
        this.palette_colorblind = this.updateColorBlindness(blind_value);
        this.palette = this.palette_colorblind;
      } else {
        this.palette = this.palette_colors;
      }
      console.log(blinder)
      this.colors = tinyScale(color);
    },
    updateColorBlindness(blind_value) {
      var obj = {}
      Object.entries(this.palette_colors).forEach(family => {
        obj[family[0]] = []
        family[1].forEach(color => {
          obj[family[0]].push(blinder.[blind_value](color))
        });
      });
      return obj;
    },
    updateScale(id, value) {
      return this[id].forEach(i => i.checked = i.value === value ? true : false);
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

function tinyScale(color) {
  if(color == undefined) {
    color = chroma.random();
  }
  var color_1 = chroma(color).set('hsl.l', 0.9).hex()
  var color_2 = chroma(color).set('hsl.l', 0.6).hex()
  var color_3 = chroma(color).set('hsl.l', 0.3).hex()
  return [ color_1, color_2, color_3 ];
}

var colorblind = [
  {
    name: "None",
    value: "None",
    checked: true,
  },
  {
    name: "Low red (protanomaly)",
    value: 'protanomaly',
    checked: false,
  },
  {
    name: "No red (protanopia)",
    value: 'protanopia',
    checked: false,
  },
  {
    name: "Low green (deuteranomaly)",
    value: 'deuteranomaly',
    checked: false,
  },
  {
    name: "No green (deuteranopia)",
    value: 'deuteranopia',
    checked: false,
  },
  {
    name: "Low blue (tritanomaly)",
    value: 'tritanomaly',
    checked: false,
  },
  {
    name: "No blue (tritanopia)",
    value: 'tritanopia',
    checked: false,
  },
  {
    name: "Low color (achromatomaly)",
    value: 'achromatomaly',
    checked: false,
  },
  {
    name: "No color (achromatopsia)",
    value: 'achromatopsia',
    checked: false,
  },
]

var scale = [
  {
    name: "Default",
    value: 'lrgb',
    checked: true,
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
    checked: false,
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
var colors = tinyScale();
var contrast = null;
var hues = 8;
var tints = 10;
var palette = makePalette(colors[1], hues, tints, value);
</script>
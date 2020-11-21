<template>
  <Sidebar :colors="colors"
    :source="source" />
  <Content
    :source="source"
    class="relative flex flex-col w-auto h-screen overflow-scroll ml-64 p-8" />
</template>

<script>
// MODULES
import chroma from 'chroma-js';
// COMPONENTS
import Sidebar from './Sidebar';
import Content from './Content';

export default {
  name: "App",
  components: {
    Sidebar,
    Content,
  },
  data() {
    return {
      colors: colors,
      source: {
        hex: colors[3],
        hues: 10,
        tints: 10,
        scale: [
          {
            name: "Brightness",
            value: 'brightness',
            checked: true,
          },
          {
            name: "Intensity",
            value: 'intensity',
            checked: false,
          },
          {
            name: "Luminosity",
            value: 'luminosity',
            checked: false,
          },
        ],
      },
    };
  },
  methods: {
    handleInput(obj) {
      var { name, value } = obj;
      this.source[name] = value;
    },
    handleRadio(e) {
      var { scale } = this.source;
      var { value } = e.target;
      scale.forEach(i => i.checked = i.value == value ? true : false)
      this.source.scale = scale;
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
const colors = chroma.cubehelix()
  .start(degree)
  .rotations(1/3)
  .hue([0.8, 1])
  .lightness([0.9, 0.5])
  .scale()
  .colors(6);
</script>
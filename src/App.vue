<template>
  <Form :colors="colors"
    :source="source"
    :scale="scale" />
  <div class="relative flex flex-col w-auto h-screen overflow-scroll ml-64 p-8">
    {{ source }}
  </div>
</template>

<script>
// MODULES
import chroma from 'chroma-js';
// COMPONENTS
import Form from './Form';

function random(num) {
  return Math.floor(Math.random() * num) + 1;
}

// Get random colors
const degree = Math.floor(Math.random() * 360) + 1
const colors = chroma.cubehelix()
  .start(degree)
  .rotations(1/3)
  .hue([0.8, 1])
  .lightness([0.9, 0.5])
  .scale()
  .colors(6);

export default {
  name: 'App',
  components: {
    Form,
  },
  data() {
    return {
      colors: colors,
      source: {
        hex: colors[3],
        hues: random(12),
        tints: random(12),
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
</script>
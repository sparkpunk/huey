<template>
  <Form :colors="colors"
    :source="source"
    :scale="scale"
    @handle-input="handleInput"
    @handle-radio="handleRadio" />
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
            selected: true,
          },
          {
            name: "Intensity",
            value: 'intensity',
            selected: false,
          },
          {
            name: "Luminosity",
            value: 'luminosity',
            selected: false,
          },
        ],
      },
    }
  },
  methods: {
    handleInput(obj) {
      var valid = false;
      var key = Object.keys(obj)[0];
      var val = Object.values(obj)[0];

      if(key === "hex") {
        if(val[0] != "#") val = `#${val}`;
        valid = /^(#)?[0-9A-F]{6}$/i.test(val);
      } else {
        valid = true;
      }

      if(valid) this.source[key] = val;
    },
    handleRadio(obj) {
      console.log(obj);
    }
  }
};
</script>
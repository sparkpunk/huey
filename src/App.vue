<template>
  <Form :colors="colors"
    :source="source.hex"
    @handle-input="handleInput" />
  <div class="relative flex flex-col w-auto h-screen overflow-scroll ml-64 p-8">
    {{ source }}
  </div>
</template>

<script>
// MODULES
import chroma from 'chroma-js';

// COMPONENTS
import Form from './Form';

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
        hues: '',
        tints: '',
        scale: ''
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
    }
  }
};
</script>
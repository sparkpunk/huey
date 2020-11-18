<template>
  <form
    onsubmit="return false"
    class="flex flex-col absolute inset-y-0 left-0 w-64 overflow-y-scroll p-10 text-gray-800 border-r border-gray-100">
    <div class="mb-12">
      <div class="flex">
        <color-box
          v-for="color in colors"
          :key="color"
          :color="color"
          class="w-4 h-4 mr-2 last:mr-0 transform hover:rotate-45 transition-all duration-200">
        </color-box>
      </div>
      <h1 class="my-4 font-display text-5xl text-gray-800">huey</h1>
      <p class="">Light to dark palettes, <br /> across the rainbow.</p>
    </div>
  </form>
</template>

<script>
// MODULES
import chroma from 'chroma-js';
// COMPONENTS
import ColorBox from './components/ColorBox';

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
    ColorBox,
  },
  created() {
    // var vm = this;
  },
  data() {
    return {
      colors: colors,
      source: colors[3],
    }
  },
};
</script>
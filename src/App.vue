<template>
  <form
    onsubmit="return false"
    class="flex flex-col absolute inset-y-0 left-0 w-64 overflow-y-scroll p-10 text-gray-800 border-r border-gray-100">
    <div class="mb-12">
      <div class="flex">
        <color-box
          v-for="color in colors"
          :key="color"
          background="color">
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
import ColorBox from './components/ColorBox.vue';

const derp = [
  chroma.random().hex(),
  chroma.random().hex(),
  chroma.random().hex(),
]

export default {
  name: 'App',
  components: {
    ColorBox,
  },
  data() {
    return {
      colors: derp,
    }
  },
}
</script>
<template>
  <div class="absolute inset-0 w-auto ml-64 overflow-y-scroll p-10">
    <div class="flex flex-col w-full h-full">
      <div v-for="(hue, h) in Object.entries(palette)"
      :key="hue[0]"
      class="w-full h-full mb-0">
        <p class="mb-1 text-xs font-semibold capitalize text-gray-200">{{ h + 1 }}. {{ hue[0].replace('_', ' ') }}</p>
        <swatch-box v-for="(color, index) in hue[1]"
        :key="color"
        :color="color"
        :ind="index"
        :text="index > (hue[1].length / 2) ? hue[1][1] : hue[1].slice(-1)[0]"
        class="w-16 h-16 inline float-left" />
      </div>
    </div>
  </div>
</template>

<script>
// COMPONENTS
import SwatchBox from './components/SwatchBox';
export default {
  name: "Workspace",
  components: [
    SwatchBox,
  ],
  props: {
    palette: {
      type: Object,
      required: true,
    },
  },
};
</script>
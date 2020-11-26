<template>
  <div class="absolute inset-0 w-auto overflow-y-scroll p-8">
    <div class="flex flex-col w-full h-full">
      <div v-for="hue in Object.entries(palette)"
      :key="hue[0]"
      class="w-full mb-2">
        <p class="mb-1 text-xs capitalize tracking-wide opacity-70"
        :style="{color: hue[1][Math.round(hue[1].length / 2)]}">{{ hue[0].replace('_', ' ') }}</p>
        <swatch-box v-for="(color, index) in hue[1]"
        :key="color"
        :color="color"
        :ind="index"
        :text="index + 1 > (hue[1].length / 2) ? hue[1][1] : hue[1].slice(-1)[0]"
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
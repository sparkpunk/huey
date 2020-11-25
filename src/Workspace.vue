<template>
  <div class="absolute inset-0 w-auto ml-64 overflow-y-scroll p-10">
    <div class="flex flex-col w-full h-full">
      <div v-for="hue in Object.entries(palette)"
      :key="hue[0]"
      class="flex w-full h-full">
        <p class="w-32 mr-2 text-xs font-semibold uppercase text-right text-gray-200">{{ hue[0] }}</p>
        <swatch-box v-for="(color, index) in hue[1]"
        :key="color"
        :color="color"
        :ind="index"
        class="w-16 h-16" />
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
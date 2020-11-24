<template>
  <div class="absolute inset-0 w-auto ml-64 overflow-y-scroll p-10">
    <div class="flex w-full h-full">
      <div v-for="(hue, index) in palette"
      :key="hue"
      class="flex flex-col h-full mr-2">
        <p class="absolute -mt-4 text-xs">{{ index }}</p>
        <swatch-box v-for="color in hue"
        :key="color"
        :color="color"
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
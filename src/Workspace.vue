<template>
  <div class="fixed top-0 right-0 bottom-0 left-56 overflow-auto flex flex-col p-8">
    <div class="absolute inset-0 w-auto overflow-y-scroll p-8">
      <div class="flex flex-col w-full h-full">
        <div v-for="hue in Object.entries(palette)"
        :key="hue[0]"
        class="mb-6 last:pb-8">
          <div class="relative flex items-end mb-1">
            <p :style="{color: hue[1][Math.ceil(hue[1].length / 2)]}"
              class="mr-2 mb-px text-xs capitalize tracking-wide">
              {{ hue[0].replace('_', ' ') }}
            </p>
            <button class="-mt-1 ml-auto py-px px-1 text-xs bg-transparent text-gray-500 rounded focus:ring-0"
              :style="{color: hue[1][Math.ceil(hue[1].length / 2)], border: '1px solid' + hue[1][0]}"
              @click="showContrast(hue, $event)">Show WCAG Contrast</button>
          </div>
          <div class="flex">
            <swatch-box v-for="(color, index) in hue[1]"
              :key="color"
              :color="color"
              :ind="index"
              :text="index + 1 > (hue[1].length / 2) ? hue[1][1] : hue[1].slice(-1)[0]"
              class="flex-grow-1 w-full h-16" />
          </div>
        </div>
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
  inject: [ 'showContrast' ],
  props: {
    color: {
      type: String,
      required: true,
    },
    palette: {
      type: Object,
      required: true,
    },
  },
};
</script>
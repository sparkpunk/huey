<template>
  <div class="absolute z-0 inset-0 w-auto overflow-y-scroll p-8">
    <!-- <div class="flex items-center h-8 mb-8">
      <div class="relative h-full mr-2">
        <button class="group absolute w-20 p-1 text-xs text-gray-800 bg-gray-100 border border-gray-200 rounded-sm">
          <div class="absolute w-20 mt-0 debug text-xs font-semibold text-center text-gray-900 transform group-hover:bg-red-500 transition-all duration-500">Copied!</div>
          <span class="">Copy CSS</span>
        </button>
      </div>
    </div> -->
    <div class="flex flex-col w-full h-full">
      <div v-for="hue in Object.entries(palette)"
      :key="hue[0]"
      class="mb-6 last:pb-8">
        <div class="relative flex items-end mb-1">
          <button class="-mt-1 mr-2 py-px px-1 text-xs rounded focus:ring-0"
            :style="{color: hue[1][hue[1].length - 3], background: hue[1][1], border: '1px solid' + hue[1][2]}"
            @click="showContrast(hue, $event)">WCAG</button>
          <p :style="{color: hue[1][Math.round(hue[1].length / 2)]}"
            class="mr-2 mb-px text-xs capitalize tracking-wide opacity-70">
            {{ hue[0].replace('_', ' ') }}
          </p>
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
    palette: {
      type: Object,
      required: true,
    },
  },
};
</script>
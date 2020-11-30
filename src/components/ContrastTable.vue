<template>
  <div class="absolute top-0 inset-x-0 overflow-hidden flex flex-col items-center mt-4 px-8">
    <p class="text-lg font-semibold text-center text-gray-400">Use this chart to quickly reference WCAG contrast ratios<sup>
      <a class="text-2xs font-bold" :style="{color: color}" :href="contrastUrl">[1]</a>
      </sup> between two colors.</p>
    <label class="relative inline-flex items-center mt-4 py-2 px-4 text-xs font-semibold text-white cursor-pointer" for="showDetails">
      <input id="showDetails"
      type="checkbox"
      @change="showDetails = !showDetails"
      :style="{
        background: color,
      }"
      class="appearance-none absolute inset-0 w-full h-full focus:outline-none rounded-xl" />
      <svg viewBox="0 0 21 23" xmlns="http://www.w3.org/2000/svg"
        :style="{opacity: showDetails ? '1' : '.2'}"
        class="z-10 fill-current w-6 h-6 mr-2">
        <path d="M10.259.062a.5.5 0 01.389-.04l.093.04 10 5.5a.5.5 0 01.25.348L21 6v11a.5.5 0 01-.184.388l-.075.05-10 5.5a.5.5 0 01-.389.04l-.093-.04-10-5.5a.5.5 0 01-.25-.348L0 17V6a.5.5 0 01.184-.388l.075-.05 10-5.5zM10.5 1.07L1 6.295v10.409l9.5 5.225 9.5-5.226V6.296L10.5 1.07zm5.815 6.042a.5.5 0 01.123.628l-.05.075-6.5 8a.5.5 0 01-.645.114l-.075-.055-4.5-4a.5.5 0 01.592-.801l.072.053 4.109 3.652 6.17-7.593a.5.5 0 01.704-.073z" />
      </svg>
      <span class="z-10 mr-1">Detail View</span>
    </label>
  </div>
  <table class="absolute top-32 w-full h-full border-collapse">
    <thead class="bg-white border border-gray-100">
      <tr class="">
        <th class="flex justify-between text-2xs font-semibold uppercase text-gray-400 border-r border-gray-100 bg-gray-50">
          <td class="w-1/2 py-1 px-2 border-r border-gray-100">Fill</td>
          <td class="w-1/2 py-1 px-2">Text</td>
        </th>
        <th class="py-0 pr-8 pl-4 text-2xs font-semibold uppercase text-gray-400 bg-gray-50 border-r border-gray-100" v-for="col in content.slice().reverse()" :key="col.contrast">
          {{ col.color }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="bg in content" :key="bg"
        :style="{background: bg.background}">
        <td class="h-10 py-0 pr-8 pl-4 text-2xs font-semibold text-right uppercase text-gray-400 bg-gray-50">
          {{ bg.background }}
        </td>
        <td v-for="text in content.slice().reverse()" :key="text"
          class="relative p-1 text-3xs border-r border-b border-white"
          :style="{color: text.color}">
          <div class="flex justify-between">
            <div class="py-px font-bold">
              {{ getContrast(text.color, bg.background).contrast }}
            </div>
            <div v-if="getContrast(text.color, bg.background).label"
              :style="{color: bg.background, background: text.color}"
              class="py-px px-1 rounded">
              {{ getContrast(text.color, bg.background).label }}
            </div>
          </div>
          <div v-show="showDetails"
            class="flex flex-col mt-1">
          <p>Aa: {{ text.color }}</p>
          <p>Bg: {{ bg.background }}</p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// MODULES
import chroma from 'chroma-js';

export default {
  name: 'contrast-table',
  props: {
    color: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      contrastUrl: 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html',
      showDetails: false,
    }
  },
  methods: {
    getContrast(color_1, color_2) {
      var label;
      var contrast = chroma.contrast(color_1, color_2).toFixed(2);
      if(contrast >= 3 && contrast < 4.5) label = "AA18";
      if(contrast >= 4.5 && contrast < 7) label = "AA";
      if(contrast >= 7) label = "AAA";
      return {
        label: label,
        contrast: contrast,
      }
    },
  },
  computed: {

  }
}
</script>
<template>
  <div class="absolute top-0 inset-x-0 overflow-hidden flex flex-col items-center mt-4 px-8">
    <p class="font-semibold text-center text-gray-400">Use this chart to quickly reference WCAG contrast ratios<sup>
      <a class="text-3xs font-bold" :href="contrastUrl">[1]</a>
      </sup> between two colors.</p>
    <label class="relative inline-flex items-center mt-4 py-2 px-4 text-xs font-semibold" for="showDetails">
      <input class="appearance-none absolute inset-0 w-full h-full text-white bg-blue-500 focus:outline-none rounded-xl" id="showDetails" type="checkbox" @change="showDetails = !showDetails" />
      <svg class="z-10 fill-current w-6 h-6 mr-2" viewBox="0 0 21 23" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.259.062a.5.5 0 01.389-.04l.093.04 10 5.5a.5.5 0 01.25.348L21 6v11a.5.5 0 01-.184.388l-.075.05-10 5.5a.5.5 0 01-.389.04l-.093-.04-10-5.5a.5.5 0 01-.25-.348L0 17V6a.5.5 0 01.184-.388l.075-.05 10-5.5zM10.5 1.07L1 6.295v10.409l9.5 5.225 9.5-5.226V6.296L10.5 1.07zm2 5.93a.5.5 0 01.242.063l.07.047 5 4a.5.5 0 01.068.715l-.068.065-5 4a.5.5 0 01-.228.103L12.5 16h-4a.5.5 0 01-.242-.063l-.07-.047-5-4a.5.5 0 01-.068-.715l.068-.065 5-4a.5.5 0 01.228-.103L8.5 7h4zm-.176 1H8.675L4.3 11.5 8.676 15h3.647l4.376-3.5L12.324 8zm-2.178 1.647a.5.5 0 01.637-.058l.07.058 1.5 1.5a.5.5 0 01.057.637l-.058.07-1.5 1.5a.5.5 0 01-.637.057l-.07-.058-1.5-1.5a.5.5 0 01-.057-.637l.058-.07 1.5-1.5zm.352 1.06l-.792.793.792.793.793-.793-.793-.793z" />
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
        <th class="pr-8 pl-4 text-2xs font-semibold uppercase text-gray-400 bg-gray-50 border-r border-gray-100" v-for="col in content.slice().reverse()" :key="col.contrast">
          {{ col.color }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="bg in content" :key="bg"
        :style="{background: bg.background}">
        <td class="pr-8 pl-4 text-2xs font-semibold text-right uppercase text-gray-400 bg-gray-50">
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
}
</script>
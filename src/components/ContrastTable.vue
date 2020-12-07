<template>
  <div class="absolute top-0 inset-x-0 overflow-hidden flex flex-col items-center mt-4 px-8">
    <p class="text-lg font-semibold text-center text-gray-400">Use this chart to quickly reference WCAG contrast ratios<sup>
      <a class="text-2xs font-bold" :style="{color: content.slice(content.length / 2, content.length / 2 + 1)[0].color}" :href="contrastUrl" target="_blank">[1]</a>
      </sup> between two colors.</p>
    <label class="relative inline-flex items-center mt-4 py-2 px-4 text-xs font-semibold text-white cursor-pointer" for="showDetails">
      <input id="showDetails"
      type="checkbox"
      @change="showDetails = !showDetails"
      :style="{
        background: content.slice(content.length / 2, content.length / 2 + 1)[0].color,
      }"
      class="appearance-none absolute inset-0 w-full h-full focus:outline-none rounded-xl" />
      <svg v-if="showDetails" viewBox="0 0 13 9" xmlns="http://www.w3.org/2000/svg"
        class="z-10 fill-current w-6 h-6 mr-2">
        <path d="M11.612.185a.5.5 0 01.826.555l-.05.075-6.5 8a.5.5 0 01-.645.114l-.075-.055-4.5-4a.5.5 0 01.592-.801l.072.053 4.109 3.652 6.17-7.593z" />
      </svg>
      <svg v-if="!showDetails" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg"
        class="z-10 fill-current w-4 h-4 my-1 mr-3 ml-1">
        <path d="M7.704.428a.5.5 0 01.122.629l-.05.074-3.017 3.697 3.017 3.698.05.075a.5.5 0 01-.762.622L7 9.158 4.114 5.62 1.228 9.158a.5.5 0 01-.826-.557l.051-.075 3.015-3.698L.453 1.131l-.05-.074a.5.5 0 01.762-.622l.063.064 2.886 3.537L7.001.5a.5.5 0 01.703-.071z" />
      </svg>
      <span class="z-10 mr-1">Detail View</span>
    </label>
  </div>
  <div class="absolute top-32 right-4 bottom-4 left-4 rounded-lg overflow-auto">
    <table class="w-full h-full">
      <thead class="h-8 text-gray-600 bg-gray-50">
        <tr class="sticky top-0 z-20 text-2xs font-semibold uppercase bg-gray-50">
          <th class="px-4">
            <span class="inline float-left">Fill</span>
            <span class="inline float-right">Text</span>
          </th>
          <th class="py-0 pr-8 pl-4 text-2xs font-semibold uppercase" v-for="col in content.slice().reverse()" :key="col.contrast">
            {{ col.color }}
          </th>
        </tr>
      </thead>
      <tbody class="overflow-auto z-0">
        <tr v-for="bg in content" :key="bg"
          :style="{background: bg.background}">
          <td class="sticky left-0 z-10 h-10 py-0 pr-8 pl-4 text-2xs font-semibold text-right uppercase text-gray-600 bg-gray-50">
            {{ bg.background }}
          </td>
          <td v-for="text in content.slice().reverse()" :key="text"
            class="relative p-1 text-3xs"
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
  </div>
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
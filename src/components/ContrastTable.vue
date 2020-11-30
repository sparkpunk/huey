<template>
  <label class="flex items-center w-auto m-2 p-2 text-xs font-semibold rounded-lg" for="showDetails">
    <span class="mr-1">Show text/background values</span>
    <input class="w-4 h-4 mt-px border border-gray-500 checked:bg-blue-500 checked:border-blue-500 focus:outline-none rounded" id="showDetails" type="checkbox" @change="showDetails = !showDetails" />
  </label>
  <table class="border-collapse">
    <thead class="bg-white border-b border-gray-100">
      <tr class="bg-white">
        <th class="font-normal bg-gray-50 p-2 text-xs text-gray-600">
          <div class="flex items-center justify-end">
            Text
            <svg class="w-3 h-3 ml-2 fill-current" viewBox="0 0 13 9" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4.5a.5.5 0 01.41-.492L.5 4h10.793L8.146.854A.5.5 0 018.09.216l.057-.07A.5.5 0 018.784.09l.07.057 4 4 .037.042.042.062.03.06.02.062.012.056L13 4.5l-.003.053-.014.075-.02.063-.052.093-.046.057-4.011 4.013a.5.5 0 01-.765-.638l.057-.07L11.293 5H.5a.5.5 0 01-.5-.5z" />
            </svg>
          </div>
          <div class="flex items-center">
            Background
            <svg class="w-3 h-3 ml-2 fill-current" viewBox="0 0 9 13" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 0a.5.5 0 01.492.41L5 .5v10.793l3.146-3.147a.5.5 0 01.638-.057l.07.057a.5.5 0 01.057.638l-.057.07-4 4-.042.037-.062.042-.06.03-.062.02-.056.012L4.5 13l-.053-.003-.075-.014-.063-.02-.093-.052-.057-.046L.146 8.854a.5.5 0 01.638-.765l.07.057L4 11.293V.5a.5.5 0 01.5-.5z" />
            </svg>
          </div>
        </th>
        <th class="font-normal px-6 text-2xs text-gray-600 bg-gray-50" v-for="col in content.slice().reverse()" :key="col.contrast">
          {{ col.color }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="bg in content" :key="bg"
        :style="{background: bg.background}">
        <td class="h-16 p-2 text-2xs text-right text-gray-600 bg-gray-50 border-r border-gray-100">
          {{ bg.background }}
        </td>
        <td v-for="text in content.slice().reverse()" :key="text"
          class="relative text-3xs border-r border-b border-white"
          :style="{color: text.color}">
          <div v-if="getContrast(text.color, bg.background).label"
            :style="{color: bg.background, background: text.color}"
            class="absolute top-0 right-0 m-1 py-px px-1 rounded">
            {{ getContrast(text.color, bg.background).label }}
          </div>
          <div class="absolute top-0 left-0 m-1 py-px font-bold">
            {{ getContrast(text.color, bg.background).contrast }}
          </div>
          <div v-show="showDetails"
            class="absolute bottom-0 flex flex-col m-1">
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
  name: "contrast-table",
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
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
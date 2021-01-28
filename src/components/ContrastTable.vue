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
        opacity
      }"
      class="appearance-none absolute inset-0 w-full h-full focus:outline-none rounded-xl" />
      <svg v-if="showDetails" viewBox="0 0 23 18" xmlns="http://www.w3.org/2000/svg"
        class="z-10 fill-current w-6 h-6 mr-2">
        <path d="M19.854.646a.5.5 0 01.057.638l-.057.07-2.575 2.573 5.544 4.691a.5.5 0 01.07.691l-.07.073-6.5 5.5A.5.5 0 0116 15H7.5a.5.5 0 01-.309-.107l-.492-.386-2.845 2.847a.5.5 0 01-.765-.638l.057-.07 2.761-2.761L.191 9.393a.5.5 0 01-.079-.709l.065-.066 6.5-5.5A.5.5 0 017 3h9a.5.5 0 01.323.118l.19.161L19.146.646a.5.5 0 01.708 0zM8.475 12.731l-1.064 1.064.262.205h2.379l-1.577-1.269zm8.095-8.095l-1.27 1.27 1.511 1.203a.5.5 0 01.18.3L17 7.5v3a.5.5 0 01-.189.391L12.902 14h2.914l5.91-5-5.156-4.364zm-1.982 1.982L13.207 8l.646.646a.5.5 0 01.058.638l-.058.07-2 2a.5.5 0 01-.707 0l-.646-.647-1.313 1.312 2.285 1.84L16 10.258V7.741l-1.412-1.123zM10.051 4h-2.87L1.29 8.985l5.33 4.187L7.692 12.1l-1.505-1.21a.5.5 0 01-.179-.3L6 10.5v-3a.5.5 0 01.187-.39L10.05 4zm1.421.14L7 7.739v2.521l1.403 1.129L9.793 10l-.646-.647a.5.5 0 01-.058-.637l.058-.07 2-2a.5.5 0 01.707 0l.646.647 1.3-1.301-2.328-1.852zM12.5 8.706l-1.292 1.293.293.293 1.292-1.293-.293-.293zm-1-1L10.209 9l.293.293 1.292-1.293-.292-.292zM15.793 4h-2.889l1.609 1.28L15.792 4z" />
      </svg>
      <svg v-if="!showDetails" viewBox="0 0 23 19" xmlns="http://www.w3.org/2000/svg"
        class="z-10 fill-current w-6 h-6 -mt-px mb-px mr-2">
        <path d="M15 5a.5.5 0 01.327.122l7.5 6.5a.5.5 0 010 .756l-7.5 6.5A.5.5 0 0115 19H8a.5.5 0 01-.327-.122l-7.5-6.5a.5.5 0 010-.756l7.5-6.5A.5.5 0 018 5zm-.186 1H8.185l-6.922 6 6.923 6h6.627l6.923-6-6.922-6zm-3.538 1.053a.5.5 0 01.448 0l3 1.5A.5.5 0 0115 9v3.25a.5.5 0 01-.11.312L14 13.675V15.5a.5.5 0 01-.41.492L13.5 16H12v.5a.5.5 0 01-.992.09L11 16.5V16H9.5a.5.5 0 01-.492-.41L9 15.5v-1.824l-.89-1.114a.5.5 0 01-.103-.228L8 12.25V9a.5.5 0 01.276-.447zm.214 6.946H10V15h3v-1.001h-1.49L11.5 14l-.01-.001zm.01-5.94L9 9.309v2.766l.74.925H11v-1.293l-.854-.853a.5.5 0 01.638-.765l.07.057.646.647.646-.647a.5.5 0 01.765.638l-.057.07-.854.852V13h1.259l.741-.927V9.309l-2.5-1.25zm-9.716-2.97l.07.057 1.5 1.5a.5.5 0 01-.638.765l-.07-.057-1.5-1.5a.5.5 0 01.638-.765zm20.07.057a.5.5 0 01.057.638l-.057.07-1.5 1.5a.5.5 0 01-.765-.638l.057-.07 1.5-1.5a.5.5 0 01.708 0zM4.359 3.152l.057.07 1 1.5a.5.5 0 01-.775.626l-.057-.07-1-1.5a.5.5 0 01.775-.626zm14.918-.068a.5.5 0 01.182.614l-.043.08-1 1.5a.5.5 0 01-.875-.476l.043-.08 1-1.5a.5.5 0 01.693-.138zM11.5 0a.5.5 0 01.492.41L12 .5v3a.5.5 0 01-.992.09L11 3.5v-3a.5.5 0 01.5-.5zM7.455 1.293l.03.086.5 2a.5.5 0 01-.94.328l-.03-.086-.5-2a.5.5 0 01.94-.328zm8.577-.292l.09.014a.5.5 0 01.377.517l-.014.09-.5 2a.5.5 0 01-.984-.154l.014-.09.5-2a.5.5 0 01.517-.377z" />
      </svg>
      <span v-if="showDetails" class="z-10 w-20 text-center mr-1">Hide details</span>
      <span v-if="!showDetails" class="z-10 w-20 text-center mr-1">Show details</span>
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
            class="relative p-1 text-3xs border-r border-b border-dotted border-opacity-50"
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
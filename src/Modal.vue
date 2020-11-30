<template>
  <div class="fixed z-50 inset-0 flex flex-col items-center justify-center p-12">
    <div class="absolute inset-0 bg-gray-900 opacity-70"></div>
    <div class="relative w-full bg-white rounded-xl shadow-xl overflow-hidden"
      :style="{height: height}">

      <div class="absolute top-0 left-0 right-0 flex items-center w-full h-16 px-4 border-b border-gray-100">
        <h1 class="mr-16 mb-2 text-2xl font-semibold text-gray-900">{{ title }}</h1>
        <div class="absolute top-0 right-0 w-16 h-16">
          <button @click="toggleModal"
            class="flex items-center justify-center w-full h-full text-lg font-semibold text-gray-500">
            ✕
          </button>
        </div>
      </div>

      <div class="absolute inset-0 top-16 overflow-auto">
        <code-coloumns v-if="name === 'code'" :content="content"></code-coloumns>
        <contrast-table v-if="name === 'contrast'" :content="content"></contrast-table>
      </div>
    </div>
  </div>
</template>

<script>
// MODULES
import chroma from 'chroma-js';

// COMPONENTS
import CodeColumns from './components/CodeColumns';
import ContrastTable from './components/ContrastTable';

export default {
  name: "modal",
  components: [
    CodeColumns,
    ContrastTable,
  ],
  inject: [ 'toggleModal' ],
  props: {
    content: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    }
  },
  data() {
    return {

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
  }
}
</script>
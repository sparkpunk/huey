<template>
  <div class="flex flex-col absolute inset-y-0 left-0 w-64 overflow-y-scroll p-8 text-gray-800 border-r border-gray-100">
    <form @submit.prevent="">
      <div class="mb-4">
        <div class="flex">
          <color-box v-for="color in colors"
            :key="color"
            :color="color"
            class="w-4 h-4 mr-2 last:mr-0" />
        </div>
        <h1 class="my-4 font-display text-5xl text-gray-800">huey</h1>
        <p class="">Light to dark palettes, <br /> across the rainbow.</p>
        <button type="button" @click="rollTheDice"
        :style="{background: color}"
        class="group flex items-center mt-4 py-2 px-4 text-xs font-bold text-white rounded-xl transition-shadow duration-200 hover:shadow focus:ring-0 focus:outline-none">
          <svg class="w-6 h-6 -ml-1 mr-3 fill-current transform group-hover:ml-1 group-hover:mr-1 group-hover:rotate-360 transition-all duration-200" viewBox="0 0 24 21" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.204.002L17.76 0l.077.008.07.018.045.017a.5.5 0 01.058.03l-.077-.038c.037.015.07.033.102.055l.058.047.06.068.03.046 5.745 9.991c.031.052.052.11.063.168l.007.065-.005.101-.02.087-.04.086-5.77 10.03-.04.052-.04.04-.038.032-.067.041-.077.032-.03.009-.076.013-.046.002-11.542-.002-.088-.015-.075-.027L6 20.933l-.037-.024-.059-.048-.03-.032-.038-.048L.044 10.705l-.033-.101-.01-.066.002-.093.013-.069.026-.077.025-.048L5.823.239 5.87.175l.069-.066.066-.045.057-.027L6.15.01l.055-.008zm9.13 18.56L10.017 20h6.61l-1.293-1.437zm-9.25-5.628l.612 6.927 7.538-2.038-8.15-4.89zm15.309.227l-5.194 4.869 1.46 1.623 3.734-6.492zM1.56 11.34l3.994 6.946-.517-5.903L1.56 11.34zm13.533-4.532l-8.623 5.19 8.537 5.124.086-10.314zm1-.025l-.083 10.053 6.657-6.241-6.574-3.812zM5.61 2.613l-4.364 7.589 3.795 1.139.569-8.727zm1.084-1.277l-.64 9.745 8.56-5.153-7.92-4.592zm11.137.31l-1.61 4.057 5.914 3.428-4.304-7.484zM17.014 1H8.109l7.239 4.196L17.014 1z" />
          </svg>
          Randomize
        </button>
      </div>
      <ColorInput name="color"
        label="Anchor (hex)"
        type="text"
        :value="color" />
      <ColorInput name="hues"
        label="Hue Families"
        type="number"
        :value="hues" />
      <ColorInput name="tints"
        label="Tints &amp; Shades"
        type="number"
        :value="tints" />
      <label class="mb-2 ml-px text-xs uppercase font-semibold">Smoothing</label>
      <ColorRadio v-for="item in scale"
        group="scale"
        :id="item.value"
        :key="item.value"
        :name="item.name"
        :value="item.value"
        :checked="item.checked" />
      <div class="group mt-auto text-xs text-gray-400">Made with <span class="relative"><span class="absolute group-hover:animate-ping w-3 h-3 -mt-px duration-500">♥️</span>♥️</span> by <a href="https://github.com/sparkpunk" rel="noreferrer">sparkpunk</a> using <a href="https://vis4.net/chromajs/" rel="noreferrer">chromajs</a></div>
    </form>
  </div>
</template>

<script>
// COMPONENTS
import ColorBox from './components/ColorBox';
import ColorInput from './components/ColorInput';
import ColorRadio from './components/ColorRadio';

export default {
  name: "Sidebar",
  inject: [ 'rollTheDice' ],
  components: {
    ColorBox,
    ColorInput,
    ColorRadio,
  },
  props: {
    colors: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    hues: {
      type: Number,
      required: true,
    },
    tints: {
      type: Number,
      required: true,
    },
    scale: {
      type: Object,
      required: true,
    },
  },
};
</script>
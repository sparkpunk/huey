<template>
  <div class="fixed inset-y-0 left-0 flex flex-col w-56 h-screen overflow-y-scroll p-8 text-gray-800 border-r border-gray-100">
    <form @submit.prevent="" id="palette-inputs">
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
        class="group flex items-center justify-center w-full mt-4 py-2 px-4 text-xs font-bold text-white rounded-xl transition-shadow duration-200 hover:shadow focus:ring-0 focus:outline-none">
          <svg class="w-6 h-6 -ml-3 mr-3 fill-current transform group-hover:-ml-1 group-hover:mr-1 group-hover:rotate-90 transition-all duration-200" viewBox="0 0 24 21" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.204.002L17.76 0l.077.008.07.018.045.017a.5.5 0 01.058.03l-.077-.038c.037.015.07.033.102.055l.058.047.06.068.03.046 5.745 9.991c.031.052.052.11.063.168l.007.065-.005.101-.02.087-.04.086-5.77 10.03-.04.052-.04.04-.038.032-.067.041-.077.032-.03.009-.076.013-.046.002-11.542-.002-.088-.015-.075-.027L6 20.933l-.037-.024-.059-.048-.03-.032-.038-.048L.044 10.705l-.033-.101-.01-.066.002-.093.013-.069.026-.077.025-.048L5.823.239 5.87.175l.069-.066.066-.045.057-.027L6.15.01l.055-.008zm9.13 18.56L10.017 20h6.61l-1.293-1.437zm-9.25-5.628l.612 6.927 7.538-2.038-8.15-4.89zm15.309.227l-5.194 4.869 1.46 1.623 3.734-6.492zM1.56 11.34l3.994 6.946-.517-5.903L1.56 11.34zm13.533-4.532l-8.623 5.19 8.537 5.124.086-10.314zm1-.025l-.083 10.053 6.657-6.241-6.574-3.812zM5.61 2.613l-4.364 7.589 3.795 1.139.569-8.727zm1.084-1.277l-.64 9.745 8.56-5.153-7.92-4.592zm11.137.31l-1.61 4.057 5.914 3.428-4.304-7.484zM17.014 1H8.109l7.239 4.196L17.014 1z" />
          </svg>
          <span>Randomize</span>
        </button>
        <button type="button" @click="getCode"
          class="group flex items-center justify-center w-full mt-4 py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-100 rounded-xl transition-shadow duration-200 hover:shadow focus:ring-0 focus:outline-none">
          <svg class="w-6 h-6 mr-2 fill-current transform transition-all group-hover:rotate-12 duration-200" viewBox="0 0 24 21" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 0a.5.5 0 0 1 .492.41L12 .5V2h4a.5.5 0 0 1 .294.095l.06.051 4 4a.5.5 0 0 1 .057.638l-.057.07-4 4a.5.5 0 0 1-.275.14L16 11h-4v2h2.5a.5.5 0 0 1 .354.146l2.5 2.5a.5.5 0 0 1 .136.452l-.288 1.442 2.401.8.361-2.169-1.818-1.817a.5.5 0 0 1-.14-.275L18 14v-1.5a.5.5 0 1 1 1 0v1.293l1.5 1.5 1.5-1.5V12.5a.5.5 0 1 1 1 0V14a.5.5 0 0 1-.146.354l-1.887 1.885-.474 2.843a.5.5 0 0 1-.563.413l-.088-.02-2.838-.947-1.014 5.07a.5.5 0 0 1-.49.402h-8a.5.5 0 0 1-.49-.402l-.989-4.942-2.884.825a.5.5 0 0 1-.608-.314l-.022-.085-.475-2.843-1.886-1.885a.5.5 0 0 1-.14-.275L0 14v-1.5a.5.5 0 0 1 .992-.09L1 12.5v1.293l1.5 1.5 1.5-1.5V12.5a.5.5 0 0 1 .992-.09L5 12.5V14a.5.5 0 0 1-.095.294l-.051.06-1.819 1.817.366 2.194 2.423-.692-.314-1.575a.5.5 0 0 1 .136-.451l2.5-2.5A.5.5 0 0 1 8.498 13H11v-2H7a.5.5 0 0 1-.294-.095l-.06-.051-4-4a.5.5 0 0 1-.057-.638l.057-.07 4-4a.5.5 0 0 1 .275-.14L7 2h4V.5a.5.5 0 0 1 .326-.469l.084-.023L11.5 0zm3.79 22H7.709l.2 1h7.181l.2-1zm-3.795-8H8.706l-2.163 2.164L7.509 21h7.981l.967-4.836L14.293 14l-2.783-.001-.01.001h-.005zm4.298-11H7.207l-3.5 3.5 3.5 3.5h8.586l3.5-3.5-3.5-3.5zM9.277 4.084l1.5 1A.5.5 0 0 1 11 5.5V7a.5.5 0 0 1-.223.416l-1.5 1a.5.5 0 0 1-.554 0l-1.5-1A.5.5 0 0 1 7 7V5.5a.5.5 0 0 1 .223-.416l1.5-1a.5.5 0 0 1 .554 0zm4.913-.047l.087.047 1.5 1a.5.5 0 0 1 .213.317L16 5.5V7a.5.5 0 0 1-.146.353l-.077.063-1.5 1a.5.5 0 0 1-.467.047l-.087-.047-1.5-1a.5.5 0 0 1-.213-.317L12 7V5.5a.5.5 0 0 1 .146-.353l.077-.063 1.5-1a.5.5 0 0 1 .467-.047zM9 5.101l-1 .667v.964L9 7.4l1-.667v-.964L9 5.1zm5 0l-1 .667v.964l1 .667 1-.667v-.964L14 5.1z" />
          </svg>
          <span>Get Code</span>
        </button>
      </div>
      <ColorInput name="color"
        label="Starting color"
        type="color"
        :value="color" />
      <ColorInput name="hues"
        label="Hue Families"
        type="number"
        :value="hues" />
      <ColorInput name="tints"
        label="Tints &amp; Shades"
        type="number"
        :value="tints" />
      <ColorSelect name="scale"
        label="Smoothing"
        :options="scale" />
    </form>
    <div class="group mt-auto text-xs text-gray-400">Made with 
      <span class="relative group-hover:text-red-400">
        <span class="absolute group-hover:animate-ping w-3 h-3 -mt-px duration-500">
          ♥️
        </span>
        ♥️
      </span>
       by <a href="https://twitter.com/zakerving" target="_blank">zak</a> using <a href="https://vis4.net/chromajs/" target="_blank">chromajs</a></div>
    <div class="mt-4 text-xs font-semibold text-gray-400">
      <a href="https://github.com/sparkpunk/huey/issues" target="_blank">
        Submit feedback
      </a>
    </div>
    </div>
</template>

<script>
// COMPONENTS
import ColorBox from './components/ColorBox';
import ColorInput from './components/ColorInput';
import ColorSelect from './components/ColorSelect';

export default {
  name: "Sidebar",
  inject: [ 'rollTheDice', 'getCode' ],
  components: {
    ColorBox,
    ColorInput,
    ColorSelect,
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
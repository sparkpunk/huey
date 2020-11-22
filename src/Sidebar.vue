<template>
  <div class="flex flex-col absolute inset-y-0 left-0 w-64 overflow-y-scroll p-10 text-gray-800 border-r border-gray-100">
    <form @submit.prevent="">
      <div class="mb-12">
        <div class="flex">
          <color-box v-for="color in colors"
            :key="color"
            :color="color"
            class="w-4 h-4 mr-2 last:mr-0" />
        </div>
        <h1 class="my-4 font-display text-5xl text-gray-800">huey</h1>
        <p class="">Light to dark palettes, <br /> across the rainbow.</p>
      </div>
      <ColorInput name="hex"
        label="Starting Hex"
        type="text"
        :value="hex" />
      <ColorInput name="hues"
        label="Hue Families"
        type="number"
        :value="hues" />
      <ColorInput name="tints"
        label="Tints &amp; Shades"
        type="number"
        :value="tints" />
      <label class="mb-2 ml-px text-xs uppercase font-semibold">Scale by</label>
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
    hex: {
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
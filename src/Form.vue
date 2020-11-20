<template>
  <form @submit.prevent=""
      class="flex flex-col absolute inset-y-0 left-0 w-64 overflow-y-scroll p-10 text-gray-800 border-r border-gray-100">
      <div class="mb-12">
        <div class="flex">
          <color-box v-for="color in colors"
            :key="color"
            :color="color">
          </color-box>
        </div>
        <h1 class="my-4 font-display text-5xl text-gray-800">huey</h1>
        <p class="">Light to dark palettes, <br /> across the rainbow.</p>
      </div>
      <ColorInput name="hex"
        label="Starting Hex"
        type="text"
        :value="source"
        @handle-input="handleInput" />
      <ColorInput name="hues"
        label="Hue Families"
        type="number"
        :value="source"
        @handle-input="handleInput" />
      <ColorInput name="tints"
        label="Tints &amp; Shades"
        type="number"
        :value="source"
        @handle-input="handleInput" />
      <!-- <ColorInput name="scale"
        type="text"
        :value="source"
        @handle-input="handleInput" /> -->
      <div class="mt-auto text-xs text-gray-400">Made with ♥️ by <a href="https://github.com/sparkpunk" rel="noreferrer">sparkpunk</a> using <a href="https://vis4.net/chromajs/" rel="noreferrer">chromajs</a></div>
    </form>
</template>

<script>
// COMPONENTS
import ColorInput from './components/ColorInput';
import ColorBox from './components/ColorBox';

export default {
  name: 'Form',
  components: {
    ColorBox,
    ColorInput,
  },
  emits: ['handle-input'],
  props: {
    'colors': {
      type: Object,
      required: true,
    },
    'source': {
      type: String,
      required: true,
    },
  },
  data() {
    return {

    }
  },
  methods: {
    handleInput(e) {
      var { id, value } = e.target;
      var obj = {};
      obj[id] = value;
      this.$emit('handle-input', obj);
    }
  }
};
</script>
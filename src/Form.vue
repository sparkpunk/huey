<template>
  <form @submit.prevent=""
      class="flex flex-col absolute inset-y-0 left-0 w-64 overflow-y-scroll p-10 text-gray-800 border-r border-gray-100">
      <div class="mb-12">
        <div class="flex">
          <ColorBox v-for="color in colors"
            :key="color"
            :color="color" />
        </div>
        <h1 class="my-4 font-display text-5xl text-gray-800">huey</h1>
        <p class="">Light to dark palettes, <br /> across the rainbow.</p>
      </div>
      <ColorInput name="hex"
        label="Starting Hex"
        type="text"
        :value="source.hex"
        @handle-input="handleInput" />
      <ColorInput name="hues"
        label="Hue Families"
        type="number"
        :value="source.hues"
        @handle-input="handleInput" />
      <ColorInput name="tints"
        label="Tints &amp; Shades"
        type="number"
        :value="source.tints"
        @handle-input="handleInput" />
      <label class="mb-2 ml-px text-xs uppercase font-semibold">Scale by</label>
      <ColorRadio v-for="item in source.scale"
        group="scale"
        :id="item.value"
        :key="item.value"
        :name="item.name"
        :value="item.value"
        :selected="item.selected"
        @handle-radio="handleRadio" />
      <div class="mt-auto text-xs text-gray-400">Made with ♥️ by <a href="https://github.com/sparkpunk" rel="noreferrer">sparkpunk</a> using <a href="https://vis4.net/chromajs/" rel="noreferrer">chromajs</a></div>
    </form>
</template>

<script>
// COMPONENTS
import ColorBox from './components/ColorBox';
import ColorInput from './components/ColorInput';
import ColorRadio from './components/ColorRadio';

export default {
  name: 'Form',
  components: {
    ColorBox,
    ColorInput,
    ColorRadio,
  },
  emits: [
    'handle-input',
    'handle-radio'
  ],
  props: {
    'colors': {
      type: Object,
      required: true,
    },
    'source': {
      'hex': {
        type: String,
        required: true,
      },
      'hues': {
        type: String,
        required: true,
      },
      'tints': {
        type: String,
        required: true,
      },
      'scale': {
        type: Object,
        required: true,
      },
    },
  },
  data() {
    return {
      'scale': this.source.scale,
    }
  },
  methods: {
    handleInput(e) {
      var { name, value } = e.target;
      var obj = {};
      obj[name] = value;
      this.$emit('handle-input', obj);
    },
    handleRadio(e) {
      var { scale } = this;
      var { value } = e.target;
      scale.forEach(i => i.selected = i.value == value ? true : false)
      this.$emit('handle-radio', scale)
    }
  }
};
</script>
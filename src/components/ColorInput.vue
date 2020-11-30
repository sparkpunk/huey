<template>
  <div class="relative flex-shrink-0 flex flex-col mb-4">
    <label :for="name"
      class="flex justify-between mb-2 ml-px">
      <span class="text-xs uppercase font-semibold">{{ label }}</span>
      <span v-if="error" class="text-xs font-semibold text-red-400">Bad value</span>
    </label>
    <input :id="name"
      :name="name"
      :type="type"
      :value="value"
      min="2"
      max="24"
      @change="validate"
      class="w-full h-10 py-2 px-4 text-sm text-gray-600 bg-transparent border border-gray-300 leading-normal transition-colors duration-100 ease-in-out rounded-lg focus:outline-none select-none truncate focus:bg-white focus:shadow-inner focus:border-gray-400"
      :class="{'border-red-400': error}" />
  </div>
</template>

<script>
export default {
  name: 'color-input',
  inject: ['handleInput'],
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      error: false,
    };
  },
  methods: {
    validate(e) {
      var is_valid = false;
      var { name, value, type } = e.target;

      value = type === "number" ? parseInt(value) : value;

      if(name === "hex") {
        if(value[0] != "#") value = `#${value}`;
        is_valid = /^(#)?[0-9A-F]{6}$/i.test(value);
      } else {
        is_valid = true
      }

      if(is_valid) {
        this.error = false;
        this.handleInput({name, value});
      } else {
        this.error = true;
        e.srcElement.value = '';
      }
    },
  }
}
</script>
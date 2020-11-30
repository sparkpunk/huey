<template>
  <div class="relative flex-shrink-0 flex flex-col mb-4">
    <label class="flex justify-between mb-2 ml-px">
      <span class="text-xs uppercase font-semibold">{{ label }}</span>
    </label>
    <select :id="name"
      :name="name"
      @change="handleSelect"
      class="appearance-none w-full h-10 px-4 text-sm text-gray-600 bg-transparent border border-gray-300 leading-normal transition-colors duration-100 ease-in-out rounded-lg focus:outline-none select-none truncate focus:bg-white focus:shadow-inner focus:border-gray-400">
      <option v-for="option in options" :key="option" :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'color-select',
  inject: [ 'handleSelect' ],
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {

    };
  },
  methods: {

  }
}
</script>
<template>
  <div class="flex-shrink-0 flex flex-col mb-6">
    <label :for="name"
      class="mb-2 ml-px text-xs uppercase font-semibold">
      {{ label }}
    </label>
    <input :id="name"
      :name="name"
      :type="type"
      :value="value"
      @change="handleInput"
      class="w-full h-10 py-2 pr-4 pl-4 text-gray-600 bg-transparent border border-gray-300 leading-normal transition-colors duration-100 ease-in-out rounded-lg focus:outline-none select-none truncate focus:bg-white focus:border-gray-400" />
  </div>
</template>

<script>
  export default {
    emits: ['handle-input'],
    props: {
      'label': {
        type: String,
        required: true,
      },
      'type': {
        type: String,
        required: true,
      },
      'name': {
        type: String,
        required: true,
      },
      'value': {
        required: true,
      }
    },
    data() {
      return {
        // source,
      }
    },
    methods: {
      handleInput(e) {
        this.$emit('handle-input', e);
      },
    },
  }
</script>
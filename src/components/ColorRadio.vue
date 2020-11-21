<template>
  <div class="flex items-center h-6 mb-2">
    <input :id="name"
      type="radio"
      :name="group"
      :value="value"
      :checked="checked"
      @change="handleRadio"
      class="debug w-4 h-4 mr-2 rounded-full" />
    <label :for="name" class="text-xs font-semibold text-gray-800">
      {{ name }}
    </label>
  </div>
</template>

<script>
export default {
  inject: ['handleRadio'],
  props: {
    'name': {
      type: String,
      required: true,
    },
    'value': {
      type: String,
      required: true,
    },
    'checked': {
      type: Boolean,
      required: true,
    },
    'group': {
      type: String,
      required: true,
    },
  },
  methods: {

  },
}
</script>
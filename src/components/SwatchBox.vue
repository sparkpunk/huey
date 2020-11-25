<template>
  <div :style="{background: color}"
  class="group relative flex flex-col items-center justify-end">
    <span class="opacity-10 group-hover:opacity-100 flex-grow-1 mb-2 p-px text-xs text-gray-700 bg-white rounded-sm transition-opacity duration-200">{{ color }}</span>
    <span class="absolute inset-0 mt-1 ml-1 text-xs text-white opacity-50">{{ ind }}</span>
  </div>
</template>

<script>
export default {
  name: "swatch-box",
  props: {
    color: {
      type: String,
      required: true,
    },
    ind: {
      required: true,
    },
  },
}
</script>
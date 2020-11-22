<template>
  <div :style="{background: color}"
  class="group relative flex flex-col items-center justify-end">
    <!-- <span class="opacity-30 group-hover:opacity-100 flex-grow-1 mb-2 p-px text-xs text-gray-700 bg-white rounded-sm transition-opacity duration-200">{{ color }}</span> -->
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
  },
}
</script>
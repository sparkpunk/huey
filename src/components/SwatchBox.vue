<template>
  <div :style="{background: color}"
    class="group relative flex flex-col items-center justify-end cursor-pointer">
    <span class="flex-grow-1 mb-2 p-px text-xs rounded-sm transition-opacity duration-100 opacity-30 group-hover:opacity-100"
    :style="{color: text}">
      {{ color }}
    </span>
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
    text: {
      type: String,
      required: true,
    },
    ind: {
      required: true,
    },
  },
}
</script>
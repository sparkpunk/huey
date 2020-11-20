<template>
  <div :style="{background: color}"
    class="w-4 h-4 mr-2 last:mr-0 transition-all duration-200">
  </div>
</template>

<script>
export default {
  props: {
    'color': {
      type: String,
      required: true,
    },
  },
}
</script>
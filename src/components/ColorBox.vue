<template>
  <div class="w-4 h-4 mr-2 rounded-sm" :style="{background: color}"></div>
</template>

<script>
export default {
  props: {
    'background': {
      type: String,
      required: true,
    },
  },
}
</script>
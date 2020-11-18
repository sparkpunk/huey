<template>
  <div :style="{background: color}"></div>
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
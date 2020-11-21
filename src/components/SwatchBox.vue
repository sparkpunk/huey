<template>
  <div :style="{background: color}"></div>
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
<template>
  <div :style="{background: color}"></div>
</template>

<script>
export default {
  name: "color-box",
  props: {
    color: {
      type: String,
      required: true,
    },
  },
}
</script>
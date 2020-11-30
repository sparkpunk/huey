<template>
<div class="relative">
  {{ content }}
</div>
</template>

<script>
export default {
  name: 'code-columns',
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {

    };
  },
}
</script>
<template>
  <div :style="{background: color}"
    @click="copyHex(color)"
    class="group relative flex flex-col items-center justify-end cursor-pointer">
    <div :style="{color: color}"
      :class="{'animate-doppler-up': copied}"
      class="absolute bottom-full flex items-center justify-center text-2xs font-semibold transition-all transform translate-y-6">Hex copied!</div>
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
  data() {
    return {
      copied: false,
    };
  },
  methods: {
    copyHex(color) {
      navigator.clipboard.writeText(color);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    },
    setTooltip() {

    }
  },
}
</script>
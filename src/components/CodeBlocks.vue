<template>
  <div class="flex w-full p-8">
    <div class="w-1/3 mr-2">
      <h3 class="mb-2 text-lg font-bold">PostCSS</h3>
      <div class="p-4 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded">
        <code v-for="(color, c) in content" :key="c">
          <p v-for="(value, v) in color" :key="v">
            --{{c.replace('_', '-')}}: {{ value }};
          </p>
        </code>
      </div>
    </div>
    <div class="w-1/3 mr-2">
      <h3 class="mb-2 text-lg font-bold">SCSS</h3>
      <div class="p-4 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded">
        <code v-for="(color, c) in content" :key="c">
          <p v-for="(value, v) in color" :key="v">
            ${{c}}: {{ value }};
          </p>
        </code>
      </div>
    </div>
    <div class="w-1/3 mr-2">
      <h3 class="mb-2 text-lg font-bold">Tailwind</h3>
      <div class="p-4 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded">
        <code>
          {
          <div v-for="(color, c) in content" :key="c">
            &nbsp;&nbsp;'{{ c }}': {
            <p v-for="(value, v) in color" :key="v">
              &nbsp;&nbsp;&nbsp;&nbsp;{{ getIndex(v) }}: {{ value }},
            </p>
            &nbsp;&nbsp;},
          </div>
          }
        </code>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'code-blocks',
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
  methods: {
    getIndex(num) {
      return num === 0 ? '50' : num * 100;
    }
  }
}
</script>
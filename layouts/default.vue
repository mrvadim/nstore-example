<template>
  <div class="container center">
    <n-header />
    <div class="mb-3">
      <button @click="showCatalog = !showCatalog">catalog</button>
      <n-catalog v-if="showCatalog" />
      <!-- <input type="text" /> -->
      <!-- <button>корзина</button> -->
      <!-- <button>сравнить</button> -->
    </div>

    <Nuxt />
    <!-- <n-footer></n-footer> -->
  </div>
</template>
<script>
export default {
  name: 'default',
  data() {
    return {
      showCatalog: false
    }
  },
  computed: {
    showBar() {
      return this.$route.path === '/';
    },
  },
  methods: {},
};
</script>

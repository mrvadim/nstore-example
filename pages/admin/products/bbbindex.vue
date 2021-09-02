<template>
  <!-- <admin-products-table :products="products" /> -->

  <div>{{products}}</div>
</template>
<script>
export default {
  name: 'productsIndex',
  // async fetch() {
  //   console.log(this.$route.name);
  //   try {
  //     this.products = await this.$axios.$get('/products');
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // },
  // data() {
  //   return {
  //     products: [],
  //   };
  // },
  async asyncData({ $axios }) {
    console.log('productsIndex');
    try {
      const PRODUCTS = await $axios.$get('/products');
      return { products: PRODUCTS };
    } catch (err) {
      console.error(err.message);
    }
  },
};
</script>

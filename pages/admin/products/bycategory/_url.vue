<template>
  <admin-products-table :products="products"  />
  <!-- <div>{{products}}</div> -->
</template>

<script>
export default {
  name: 'productsUrl',
  // async fetch() {
  //   const URL = this.$route.params.url;
  //   try {
  //     this.products = await this.$axios.$get('/products/bycategory/' + URL);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // },
  // data() {
  //   return {
  //     products: [],
  //   };
  // },
  // watch: {
  //   '$route.query': '$fetch',
  // },
  async asyncData({ params, $axios }) {
    const URL = params.url;
    console.log('productsUrl: ', URL);
    try {
      const PRODUCTS = await $axios.$get('/products/bycategory/' + URL);
      return { products: PRODUCTS };
    } catch (err) {
      console.error(err.message);
    }
  },
};
</script>

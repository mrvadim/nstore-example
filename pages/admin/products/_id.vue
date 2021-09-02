<template>
  <div class="flex flex-2">{{product}}</div>
</template>
<script>
export default {
  name: 'productId',
  // async fetch() {
  //   const ID = this.$route.params.id;
  //   try {
  //     this.product = await this.$axios.$get('/products/' + ID);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // },
  // data() {
  //   return {
  //     product: null,
  //   };
  // },
  async asyncData({ params, $axios }) {
    const ID = params.id;
    console.log('productId: ', ID);
    let requestString = '/products/';
    if (ID) requestString = requestString + ID;

    try {
      const PRODUCT = await $axios.$get(requestString);
      return { product: PRODUCT };
    } catch (err) {
      console.error(err.message);
    }
  },
};
</script>

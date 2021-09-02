<template>
  <div class="flex-2">

    <div class="grid grid-products mb-1">
      <div>id</div>
      <div class="grid-products-name">name</div>
      <div>price</div>
      <div>in stock</div>
    </div>

    <div class="grid grid-products mb-1" v-for="product in paginatedproducts" :key="product.product_id">
      <nuxt-link :to="`/admin/products/${product.product_id}`">{{ product.product_id }}</nuxt-link>
      <div class="grid-products-name">{{ product.name }}</div>
      <div><input type="number" :value="product.price" /></div>
      <div @click="invert" class="pointer">
        <svg-icon-check :class="product.in_stock ? 'color-success' : 'color-secondary'"/>
      </div>
    </div>

    <div>
      <button :disabled="pageNumber<=0" @click="prevPage">prev</button>
      <button v-for="n in pageCount" :key="n" @click="pageNumber=n-1">{{n}}</button>
      <button :disabled="pageNumber>=pageCount-1" @click="nextPage">next</button>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  data() {
    return {
      in_stock: false,
      pageNumber: 0,
    };
  },
  computed: {
    pageCount() {
      // Math.ceil - округление вверх
      return Math.ceil(this.products.length / this.size);
    },
    paginatedproducts() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.products.slice(start, end);
    },
  },
  methods: {
    invert() {
      console.log('click');
      this.in_stock = !this.in_stock;
    },

    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
};
</script>

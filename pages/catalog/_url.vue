<template>
  <div class="">
    <div class="mb-3">
      <h1 v-if="categoryData.products.length" class="title">{{ title }}</h1>
      <h1 class="loading" v-else>Empty</h1>
      <!-- <p class="subtitle">category</p> -->
    </div>
    <div class="flex-row">
      <!-- <p class="">sort</p> -->
      <p class="mr-2">items on page:</p>
      <a class="mr-2" @click.prevent="itemsLimit = 5" href>5</a>
      <a class="mr-2" @click.prevent="itemsLimit = 10" href>10</a>
      <a class="mr-2" @click.prevent="itemsLimit = 20" href>20</a>
      <p>total: {{ total }}</p>
    </div>
    <div class="flex-row flex-sy">
      <div class="flex-column flex-4 mr-2">
        <div v-if="categoryData.products.length" class="grid grid-5 mb-3">
          <div v-for="p in categoryData.products" :key="p.product_id">
            <n-card :product="p"></n-card>
          </div>
        </div>
        <div v-else class="grid grid-5 mb-3">
          <!-- <div v-for="a in 5" :key="a">
            <n-card skeleton />
          </div> -->
          <n-loading>Empty</n-loading>
        </div>
        <div v-if="show > 0" class="pagination center mb-2">
          <button @click="moreProducts">show more {{ show }}</button>
        </div>
      </div>
      <div class="flex-1">
        <n-filter
          v-if="categoryData.products.length"
          :filter-data="filterData"
          @filtered="onfilter"
        />
        <n-loading v-else>Empty</n-loading>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  name: "catalog-url",
  async fetch() {
    try {
      this.categoryData = await this.$axios.$get(
        "/products/bycategory/" + this.$route.params.url,
        {
          params: { limit: this.itemsLimit, offset: this.itemsOffset },
        }
      );

      this.itemsOffset = this.itemsLimit;

      if (this.categoryData.info.length) {
        this.title = this.categoryData.info[0].cat_name;
        this.total = this.categoryData.info[0].count;
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  data() {
    return {
      categoryData: { products: [], info: [] },
      itemsLimit: 5,
      itemsOffset: 0,
      showMoreButton: true,
      total: 0,
      title: "empty",
    };
  },
  computed: {
    show() {
      return this.total - this.itemsOffset > this.itemsLimit
        ? this.itemsLimit
        : this.total - this.itemsOffset;
    },
    filterData() {
      if (this.categoryData.products.length) {
        let priceArr = this.categoryData.products.map((el) => el.price);
        
        return {
          priceMin: Math.min(...priceArr),
          priceMax: Math.max(...priceArr),
        };
      } else {};
    },
  },
  methods: {
    async onfilter(val){
      // console.log('onfilter',val);
      try {
        const RESULT = await this.$axios.$get(
          "/products/bycategory/" + this.$route.params.url + "/filter",
          {
            params: { limit: this.itemsLimit, offset: this.itemsOffset, filter: val },
          }
        );
      } catch (error) {
        console.log(error);
      }

    },
    async moreProducts() {
      try {
        const RESULT = await this.$axios.$get(
          "/products/bycategory/" + this.$route.params.url,
          {
            params: { limit: this.itemsLimit, offset: this.itemsOffset },
          }
        );
        this.categoryData.products = [
          ...this.categoryData.products,
          ...RESULT.products,
        ];
        this.itemsOffset += this.itemsLimit;
      } catch (error) {
        console.log(error);
      }
    },
    async filterProducts() {},
  },
};
</script>

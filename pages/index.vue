<template>
  <div class="index-page">
    <!-- <catalog-button /> -->
    <div class="mb-3">
      <h1 class="title">Home</h1>
      <p class="subtitle">Just a subtitle in home section</p>
    </div>

    <div class="mb-3">
      <h2>Random categories</h2>
      <div class="grid grid-5">
        <div v-for="c in categories" :key="c.category_id">
          <!-- <nuxt-link :to="`catalog/${c.url}`">{{c.name}}</nuxt-link> -->

          <div>
            <!-- <span>name+params</span> -->
            <nuxt-link
              :to="{
                name: 'catalog-url',
                params: { url: c.url, name: c.name },
              }"
              >{{ c.name }}</nuxt-link
            >
          </div>
          <!-- <div>
            <span>path+query</span>
            <nuxt-link
              :to="{ path: 'catalog/' + c.url, query: { name: c.name } }"
            >
              {{ c.name }}
            </nuxt-link>
          </div> -->
          <img src="catalog.png" alt="">
          <!-- <p>{{ c }}</p> -->
        </div>
      </div>
    </div>
    <div class="mb-3">
      <h2>Random products</h2>
      <div class="grid grid-5">
        <div v-for="p in products" :key="p.product_id">
          <n-card show-category :product="p"></n-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  // async fetch() {
  //   try {
  //     await this.$store.dispatch('products/fetchAll');
  //     if (this.$toast) this.$toast.success('Товары загружены');
  //   } catch (err) {
  //     console.error(err.message);
  //     if (this.$toast) this.$toast.error('Ошибка');
  //   }
  // },

  async asyncData({ $axios }) {
    console.log("index-random-select");
    try {
      const [categories, products] = await Promise.all([
        $axios.$get("/categories/random"),
        $axios.$get("/products/random"),
      ]);
      return { categories, products };
    } catch (err) {
      console.error(err);
    }
  },

  data() {
    return {};
  },
  computed: {
    // categories() {
    //   return this.$store.state.categories.categories;
    // },
    // rootCategories() {
    //   return this.categories.filter((el) => el.parent_id === null);
    // },
    // categoriesTree() {
    //   if (this.categories.length) {
    //     let obj = {};
    //     let obj2 = {};
    //     let arr = [];
    //     this.categories.forEach((el) => {
    //       obj[el.category_id] = { ...el, children: [] };
    //       obj2[el.category_id] = {
    //         category_id: el.category_id,
    //         parent_id: el.parent_id,
    //         name: el.name,
    //         children: [],
    //       };
    //     });
    //     this.categories.forEach((el) => {
    //       if (el.parent_id)
    //         obj2[el.parent_id].children.push(obj2[el.category_id]);
    //       else arr.push(obj2[el.category_id]);
    //     });
    //     return arr.filter((el) => el.category_id === 40);
    //   } else {
    //     return [];
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>

</style>

<template>
  <div>
    <div><h3>{{ $t('products') }}</h3></div>

    <div class="mb-2">
      <button @click="$fetch">{{ $t('reload') }}</button>
      <input type="text" v-model="search" :placeholder="$t('search')" />
    </div>

    <div class="flex-row">
      <div class="flex-1 mr-2">
        <ul id="categories-tree">
          <admin-categories-element v-for="item in categoriesTree" :items="item" :key="item.category_id" />
        </ul>
      </div>
      <div class="flex-1">
        <div class="grid grid-products mb-2">
          <div>name</div>
          <div>price</div>
          <div>in stock</div>
        </div>
        <div class="grid grid-products mb-1" v-for="product in filteredProducts" :key="product.product_id">
          <!-- <nuxt-link :to="`products/${product.product_id}`">{{ product.product_id }}</nuxt-link> -->
          <div>{{ product.name }}</div>
          <div>{{ product.price }}</div>
          <div>
            <svg-icons name="check-square-fill" :class="product.in_stock ? 'color-success' : 'color-secondary'"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'products',
  async fetch() {
    try {
      await this.$store.dispatch('products/fetchAll');
      console.log('async fetch products');
    } catch (err) {
      console.error(err.message);
    }
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    products() {
      return this.$store.state.products.products;
    },

    filteredProducts() {
      return this.products.filter((el) => {
        const s = this.search.toLowerCase();
        const nm = el.name.toLowerCase().includes(s);
        const url = el.url.toLowerCase().includes(s);
        return nm || url;
      });
    },
    categories() {
      return this.$store.state.categories.categories;
    },
    filteredCategories() {
      return this.categories.filter(this.filterFn);
    },
    isEdit() {
      return this.$store.state.categories.edit;
    },
    categoriesTree() {
      if (this.categories.length) {
        let obj = {};
        let arr = [];
        this.categories.forEach((el) => {
          obj[el.category_id] = { ...el, children: [] };
        });
        this.categories.forEach((el) => {
          if (el.parent_id)
            obj[el.parent_id].children.push(obj[el.category_id]);
          else arr.push(obj[el.category_id]);
        });
        return arr;
      } else {
        return [];
      }
    },
    categoriesList() {
      let a = [{ value: null, text: 'Choose' }];
      if (this.categories.length) {
        this.categories.forEach((el) => {
          a.push({ value: el.category_id, text: el.name });
        });
      }
      return a;
    },
    cUrl() {
      return cyrillicToTranslit().transform(this.cName, '_');
    },
  },
  methods: {},
};
</script>

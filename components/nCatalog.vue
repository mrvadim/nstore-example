<template>
  <div class="catalog border">
    <ul class="catalog-list">
      <catalog-element
        class="catalog-item p-3"
        v-for="el in categoriesTree"
        :el="el"
        :key="el.category_id"
      />
    </ul>
  </div>
</template>

<style lang="scss">
@use "sass:math";
.catalog {
  .catalog-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    .catalog-item {
      &:nth-child(odd) {
        background-color: lightskyblue;
      }
    }
  }
}
</style>

<script>
export default {
  async fetch() {
    try {
      console.log("categories");
      this.categories = await this.$axios.$get("/categories");
    } catch (error) {
      console.error(error.message);
    }
  },
  data() {
    return {
      categories: [],
    };
  },
  computed: {
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
        return arr[0].children;
      } else {
        return [];
      }
    },
  },
  methods: {
    openCatalog() {},
  },
};
</script>

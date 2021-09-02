<template>
  <li class="element">
    <div class="flex-row">
      <div v-if="!Number(el.products_count) || el.children.length">
        <p>{{ el.name }}</p>
      </div>
      <div v-else>
        <nuxt-link :to="`/catalog/${el.url}`"
          >{{ el.name }} ({{ el.products_count }})</nuxt-link
        >
      </div>
    </div>

    <ul class="flex-column" v-if="isFolder">
      <menu-element v-for="el in el.children" :key="el.category_id" :el="el" />
    </ul>
  </li>
</template>
<script>
export default {
  name: "menu-element",
  props: {
    el: Object,
  },
  computed: {
    isFolder: function () {
      return this.el.children && this.el.children.length;
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.element {
  a {
    text-decoration: none;
    color: black;
  }
  ul {
    margin-left: 1rem;
  }
}
</style>

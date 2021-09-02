<template>
  <li>
    <div class="grid grid-categories mb-1 elem">
      <div @click="toggle">
        <svg-icon-folder-open v-if="isFolder && isOpen" class="color-warning" />
        <svg-icon-folder-plus v-else-if="isFolder" class="color-warning" />
        <svg-icon-folder v-else class="color-warning" />
      </div>
      <!-- <div><n-img size="32" color="lightgrey" /></div> -->
      <!-- <div><svg-icon-check :class="items.show ? 'color-success' : 'color-secondary'" /></div> -->
      <!-- <div>{{ items.category_id }}</div> -->
      <nuxt-link :class="items.show ? 'color-success' : 'color-secondary'" :to="`/admin/products/bycategory/${items.url}`">{{ items.name }}</nuxt-link>
      <!-- <div :class="items.show ? 'color-success' : 'color-secondary'">
        {{ items.name }}
      </div> -->
      <!-- <div>{{ items.url }}</div> -->

      <div>
        <button @click="edit(items)">edit</button>
      </div>
    </div>

    <ul v-show="isOpen" v-if="isFolder">
      <categories-element
        v-for="(item, idx) in items.children"
        :key="idx"
        :items="item"
      />
    </ul>
  </li>
</template>
<script>
export default {
  name: 'categoriesElement',
  props: {
    items: Object,
  },
  data() {
    return {
      isOpen: true,
    };
  },
  computed: {
    isFolder() {
      return this.items.children && this.items.children.length;
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    edit(item) {
      this.$store.commit('categories/EDIT_CATEGORY', {
        item,
        edit: true,
      });
    },
  },
};
</script>

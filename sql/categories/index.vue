<template>
  <div>
    <div><h3>{{ $t('categories') }}</h3></div>
    <div class="mb-2">
      <button @click="$fetch">{{ $t('reload') }}</button>
      <button @click="create()">{{ $t('create') }}</button>
      <input type="text" v-model="search" :placeholder="$t('search')" />
      <div class="info-block p-2 mb-2 mt-2">
        <span>Всего категорий: {{categories.length}},</span>
        <span>Найдено: {{filteredCategories.length}}</span>
      </div>
      <nuxt-link to="/admin/categories/products">aaaaa</nuxt-link>
    </div>

    <!-- <div class="grid grid-categories mb-2 bold">
      <div>folder</div>
      <div>image</div>
      <div>active</div>
      <div>id</div>
      <div>name</div>
      <div>url</div>
      <div>edit</div>
    </div> -->

    <!-- <ul id="categories-tree">
      <admin-categories-element v-for="item in categoriesTree" :items="item" :key="item.category_id" />
    </ul> -->

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
          <nuxt-link :to="`products/${product.product_id}`">{{ product.product_id }}</nuxt-link>
          <div>{{ product.name }}</div>
          <div>{{ product.price }}</div>
          <div>
            <svg-icon-check :class="product.in_stock ? 'color-success' : 'color-secondary'"/>
          </div>
        </div>
      </div>
    </div>
    <div><nuxt-child></nuxt-child></div>



    <n-modal>
      <template v-slot:header>
        <div class="header"><h3 class="title">{{mHeader}}</h3></div>
      </template>
      <div class="grid grid-modal">
        <div>image</div><div><n-img size="32" color="lightgrey" /></div>
        <div>new image</div><div><input name="file" type="file" @change="uploadNewImage" /></div>
        <div>parent</div>
        <div>
          <select v-model="cPid">
            <option v-for="(option, idx) in categoriesList" v-bind:value="option.value" :key="idx">{{ option.text }}</option>
          </select>
        </div>
        <div>name</div><div><input v-model="cName" placeholder="Category name" @input="onTyping" /></div>
        <div>url</div><div>{{cUrl}}</div>
        <div>show</div><div><n-checkbox :checked="cShow" v-model="cShow" name="showCategory" /></div>
      </div>
      <template v-slot:footer>
        <div class="footer">
          <button @click="closeModal()">cancel</button>
          <button :disabled='!isCreating' @click="onSave()">save</button>
          <button :disabled='isCreating' @click="onUpdate()">update</button>
          <button :disabled='isCreating' @click="onDelete()">delete</button>
        </div>
      </template>
    </n-modal>
  </div>
</template>
<script>
import cyrillicToTranslit from 'cyrillic-to-translit-js';
export default {
  name: 'categories',
  async fetch() {
    // try {
    //   await this.$store.dispatch('categories/fetchAll');
    //   if (this.$toast) this.$toast.success('Категории загружены');
    // } catch (err) {
    //   console.error(err.message);
    //   if (this.$toast) this.$toast.error('Ошибка');
    // }
    try {
      await this.$store.dispatch('products/fetchAll');
      if (this.$toast) this.$toast.success('Список товаров обновлен');
    } catch (err) {
      console.error(err.message);
      if (this.$toast) this.$toast.error('Ошибка обновления');
    }
  },
  data() {
    return {
      cId: null,
      cName: '',
      cPid: null,
      cShow: true,
      cImage: null,
      mHeader: '',
      search: '',
      isCreating: true,
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

  methods: {
    filterFn(cat) {
      const s = this.search.toLowerCase();
      const nm = cat.name.toLowerCase().includes(s);

      return nm;
    },
    init() {
      this.cName = '';
      this.cShow = true;
      this.cId = null;
      this.cPid = null;
      this.cImage = null;
    },
    create() {
      this.mHeader = 'Создать';
      this.isCreating = true;
      this.$modal(true);
    },
    edit(content) {
      this.mHeader = `Изменить или удалить категорию "ID ${content.category_id}"`;
      this.isCreating = false;
      this.$modal(true);
      this.cId = content.category_id;
      this.cPid = content.parent_id;
      this.cName = content.name;
      this.cShow = content.show;
    },
    closeModal() {
      this.$modal(false);
      this.$store.commit('categories/EDIT_CATEGORY', {
        item: null,
        edit: false,
      });
      this.init();
    },
    uploadNewImage() {},
    onTyping() {},

    async onSave() {
      try {
        const RESULT = await this.$store.dispatch('categories/createCategory', {
          parent_id: this.cPid,
          name: this.cName,
          url: this.cUrl,
          show: this.cShow,
        });
        this.$toast.success(`Создана категория: "${RESULT.name}"`);
        this.closeModal();
      } catch (error) {
        console.error('create error:', error.response.data.message);
        this.$toast.error(`Ошибка: ${error.response.data.message}`);
      }
    },
    async onDelete() {
      try {
        const RESULT = await this.$store.dispatch(
          'categories/deleteCategory',
          this.cId
        );
        this.$toast.success(`Удалена категория: "ID ${RESULT}"`);
        this.closeModal();
      } catch (error) {
        this.$toast.error(`Ошибка удаления: "${error.response.data.message}"`);
        console.error('delete error:', error);
      }
    },
    async onUpdate() {
      try {
        const RESULT = await this.$store.dispatch('categories/updateCategory', {
          id: this.cId,
          item: {
            parent_id: this.cPid,
            name: this.cName,
            url: this.cUrl,
            show: this.cShow,
          },
        });
        this.$toast.success(`Обновлена категория: "${RESULT.name}"`);
        this.closeModal();
      } catch (error) {
        console.error('update error:', error.response.data.message);
        this.$toast.error(
          `Ошибка обновления: "${error.response.data.message}"`
        );
      }
    },
  },
  watch: {
    isEdit: function (newValue, oldValue) {
      let content = this.$store.state.categories.category;
      if (newValue) this.edit(content);
    },
  },
};
</script>

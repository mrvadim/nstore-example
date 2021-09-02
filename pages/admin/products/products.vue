<template>
  <div>
    <div><h3>{{ $t('products') }}</h3></div>
    <div class="mb-2">
      <button @click="$fetch">{{ $t('reload') }}</button>
      <button @click="create()">{{ $t('add_category') }}</button>
      <input type="text" v-model="search" :placeholder="$t('search')" />
      <div class="info-block p-2 mb-2 mt-2">
        <span>Всего категорий: {{categories.length}},</span>
      </div>
    </div>

    <div class="flex-row">
      <div class="flex-1 mr-2">
        <ul id="categories-tree">
          <admin-categories-element v-for="item in categoriesTree" :items="item" :key="item.category_id" />
        </ul>
      </div>
      <!-- <nuxt-child></nuxt-child> -->
    </div>

    <n-modal :show="show" v-on:close="closeModal()" :header='mHeader'>

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
    try {
      console.log('categories');
      this.categories = await this.$axios.$get('/categories/all');
    } catch (error) {
      console.error(error.message);
    }
  },
  data() {
    return {
      categories: [],
      cId: null,
      cName: '',
      cPid: null,
      cShow: true,
      cImage: null,
      mHeader: '',
      search: '',
      isCreating: true,
      show: false,
    };
  },
  computed: {
    // products() {
    //   return this.$store.state.products.products;
    // },

    // filteredProducts() {
    //   return this.products.filter((el) => {
    //     const s = this.search.toLowerCase();
    //     const nm = el.name.toLowerCase().includes(s);
    //     const url = el.url.toLowerCase().includes(s);
    //     return nm || url;
    //   });
    // },
    // categories() {
    //   return this.$store.state.categories.categories;
    // },
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
    init() {
      this.cName = '';
      this.cShow = true;
      this.cId = null;
      this.cPid = null;
      this.cImage = null;
    },
    create() {
      this.init();
      this.mHeader = 'Add / Добавить';
      this.isCreating = true;
      this.show = true;
    },
    edit() {
      const CATEGORY = this.$store.state.categories.category;
      this.mHeader = `Изменить или удалить категорию "ID ${CATEGORY.category_id}"`;
      this.isCreating = false;
      this.show = true;
      this.cId = CATEGORY.category_id;
      this.cPid = CATEGORY.parent_id;
      this.cName = CATEGORY.name;
      this.cShow = CATEGORY.show;
    },
    closeModal() {
      this.show = false;
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
        const RESULT = await this.$axios.$post('/categories/', {
          parent_id: this.cPid,
          name: this.cName,
          url: this.cUrl,
          show: this.cShow,
        });
        // this.$toast.success(`Создана категория: "${RESULT.name}"`);
        this.categories.push(RESULT);
        this.closeModal();
      } catch (error) {
        console.error('create error:', error.response.data.message);
        // this.$toast.error(`Ошибка: ${error.response.data.message}`);
      }
    },
    async onDelete() {
      try {
        await this.$axios.$delete(`/categories/${this.cId}`);
        this.categories = this.categories.filter(
          (el) => el.category_id !== this.cId
        );
        // this.$toast.success(`Удалена категория: "ID ${this.cId}"`);
        this.closeModal();
      } catch (error) {
        // this.$toast.error(`Ошибка удаления: "${error.response.data.message}"`);
        console.error('delete error:', error);
      }
    },
    async onUpdate() {
      try {
        const RESULT = await this.$axios.$put('/categories/' + this.cId, {
          parent_id: this.cPid,
          name: this.cName,
          url: this.cUrl,
          show: this.cShow,
        });

        const IDX = this.categories.findIndex(
          (el) => el.category_id === RESULT.category_id
        );
        this.categories.splice(IDX, 1, RESULT);

        // this.$toast.success(`Обновлена категория: "${RESULT.name}"`);
        this.closeModal();
      } catch (error) {
        console.error('update error:', error.response.data.message);
        // this.$toast.error(
        //   `Ошибка обновления: "${error.response.data.message}"`
        // );
      }
    },
  },
  watch: {
    isEdit: function (newValue, oldValue) {
      if (newValue) this.edit();
    },
  },
};
</script>

export const actions = {
  async fetchAll({ commit }) {
    let categories = await this.$axios.$get("/categories/all");
    commit("SET_CATEGORIES", categories);
  },

  async createCategory({ commit }, item) {
    const result = await this.$axios.$post("/categories/", item);
    commit("ADD_CATEGORY", result);
    return result;
  },

  async updateCategory({ commit }, payload) {
    const result = await this.$axios.$put(
      "/categories/" + payload.id,
      payload.item
    );
    commit("UPDATE_CATEGORY", result);
    return result;
  },

  async deleteCategory({ commit }, id) {
    await this.$axios.$delete(`/categories/${id}`);
    commit("KILL_CATEGORY", id);
    return id;
  }
};

export const mutations = {
  ADD_CATEGORY(state, data) {
    state.categories.push(data);
  },

  UPDATE_CATEGORY(state, data) {
    const IDX = state.categories.findIndex(
      el => el.category_id === data.category_id
    );
    state.categories.splice(IDX, 1, data);
  },

  KILL_CATEGORY(state, data) {
    state.categories = state.categories.filter(el => el.category_id !== data);
  },

  SET_CATEGORIES(state, data) {
    state.categories = data;
  },

  EDIT_CATEGORY(state, { item, edit }) {
    state.category = item;
    state.edit = edit;
  }
};

export const state = () => ({
  category: null,
  edit: false,
  categories: []
});

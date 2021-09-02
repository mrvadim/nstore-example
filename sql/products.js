export const actions = {
  async fetchAll({ commit }) {
    let products = await this.$axios.$get("/products");
    commit("SET_PRODUCTS", products);
  },
  async fetchByCategoryUrl({ commit }, payload) {
    let products = await this.$axios.$get("/products/bycategory/" + payload);
    commit("SET_PRODUCTS", products);
  }
};

export const mutations = {
  SET_PRODUCTS(state, data) {
    state.products = data;
  },
  SORT(state, data) {
    state.products.sort((a, b) => {
      if (data.sortBy) {
        return data.sortDesc
          ? b[data.sortBy] - a[data.sortBy]
          : a[data.sortBy] - b[data.sortBy];
      } else {
        return a.product_id - b.product_id;
      }
    });
  }
};

export const state = () => ({
  products: []
});

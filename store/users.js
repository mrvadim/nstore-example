export const actions = {
  // async update({ commit }, payload) {
  //   const RESULT = await this.$axios.$put("/users/update", payload);
  //   this.$auth.setUser(RESULT);
  // },
  // async changePassword({ commit }, payload) {
  //   const RESULT = await this.$axios.$put("/users/change-password", payload);
  //   return RESULT;
  // }
};

export const mutations = {
  SET_STATUS(state, data) {
    state.status = data;
  }
};

export const state = () => ({
  users: [],
  status: ""
});

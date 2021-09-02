export const actions = {
  async fetchAll({ commit }) {
    let users = await this.$axios.$get("/users/all");
    commit("SET_USERS", users);
  },
  async delete({ commit }, payload) {
    await this.$axios.$delete("/users/" + payload);
    commit("KILL_USER", payload);
  },
  async activate({ commit }, payload) {
    await this.$axios.$put("/users/activate", payload);
    commit("ACTIVATE_USER", payload);
  },
  async update({ commit }, payload) {
    const RESULT = await this.$axios.$put("/users/update", payload);
    this.$auth.setUser(RESULT);
  },
  async changePassword({ commit }, payload) {
    const RESULT = await this.$axios.$put("/users/change-password", payload);
    return RESULT;
  }
};

export const mutations = {
  SET_USERS(state, data) {
    state.users = data;
  },
  KILL_USER(state, data) {
    state.users = state.users.filter(el => el.user_id !== data);
  },
  SET_STATUS(state, data) {
    state.status = data;
  },
  ACTIVATE_USER(state, data) {
    state.users.find(el => el.user_id === data.id).active = data.state;
  }
};

export const state = () => ({
  users: [],
  status: ""
});

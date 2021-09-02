export const mutations = {
  EDIT_CATEGORY(state, { item, edit }) {
    state.category = item;
    state.edit = edit;
  }
};

export const state = () => ({
  category: null,
  edit: false
});

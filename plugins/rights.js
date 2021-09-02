const rights = {
  user: 1,
  manager: 2,
  admin: 4
};
export default ({ app }, inject) => {
  inject("rights", rights);
};

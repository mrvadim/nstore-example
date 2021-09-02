<template>
  <div class="admin-users">
    <div><h3>{{ $t('users') }}</h3></div>
    <div class="mb-2">
      <input type="text" v-model="search" :placeholder="$t('search')" />
      <button @click="search = ''">X</button>
      <div v-if="users" class="info-block p-2 mb-2 mt-2">
        <span>Всего: {{users.length}},</span>
        <span>Отображено: {{filteredUsers.length}}</span>
      </div>

    </div>

    <div class="grid grid-users grid-users-header mb-1 bold pointer">
      <div class="sortable flex-cx" @click="onSortUsers('user_id')">id</div>
      <div>full name</div>
      <div>e-mail</div>
      <div class="flex-cx">last login</div>
      <div class="sortable flex-cx" @click="onSortUsers('role_id')">role</div>
      <div class="sortable flex-cx" @click="onSortUsers('active')">active</div>
      <div class="flex-cx">delete?</div>
    </div>

    <div v-for="user in filteredUsers" :key="user.user_id" class="grid grid-users mb-1">
      <div class="pointer flex-cx"><nuxt-link :to="`users/edit/${user.user_id}`">{{ user.user_id }}</nuxt-link></div>
      <div>{{ user.first_name }} {{ user.last_name }}</div>
      <div><a href @click.prevent="showModal(user)">{{ user.email }}</a></div>
      <div class="flex-cx">{{ new Date(user.last_login).toLocaleDateString() }}</div>
      <div class="flex-cx">{{ user.role_id }}</div>
      <div class="flex-cx"><n-checkbox :checked="user.active" @input="onChangeUserState(user)" /></div>
      <div class="flex-cx"><button @click="onDeleteUser(user)">del</button></div>

    </div>

    <n-modal :show="show" v-on:close="show = false" :header='"Пользователь: " + selectedUser.first_name'>
        <div class="grid grid-modal mb-1" v-for="(value, name) of selectedUser" :key="name">
          <div>{{name}}</div><div>{{value}}</div>
        </div>
        <!-- <div>active</div><div><n-checkbox :checked="selectedUser.active" @input="onChangeUserState(selectedUser)" /></div>
        <div>gender</div><div>{{selectedUser.gender === 'm'? 'male': selectedUser.gender === 'f'?'female':'nobody'}}</div>
        <div>birthday</div><div>{{ new Date(selectedUser.birthday).toLocaleDateString() }}</div> -->
    </n-modal>

  </div>
</template>

<style lang="scss" scoped>
.admin-users {
  .grid-users {
    grid-template-columns: 3rem 2fr 2fr 1fr 3rem 4rem 4rem;
    grid-template-rows: 1fr;

    > div {
      border: 1px solid lightgray;
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
    }
  }
  .grid-users-header {
    background: rgb(231, 231, 231);
  }
}
</style>

<script>
export default {
  name: 'admin-users-index',
  async fetch() {
    try {
      this.users = await this.$axios.$get('/users/all');
    } catch (error) {
      console.error(error.message);
    }
  },
  data() {
    return {
      isBusy: true,
      search: '',
      show: false,
      sortBy: 'user_id',
      sortType: false,
      selectedUser: {},
      users: [],
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(this.filterFn).sort(this.sortFn);
    },
  },
  methods: {
    showModal({ user_id }) {
      this.show = true;
      this.selectedUser = this.filteredUsers.find(
        (user) => user.user_id === user_id
      );
    },

    filterFn(user) {
      const s = this.search.toLowerCase();
      const em = user.email.toLowerCase().includes(s);
      const fn = !(user.first_name === null)
        ? user.first_name.toLowerCase().includes(s)
        : false;
      const ln = !(user.last_name === null)
        ? user.last_name.toLowerCase().includes(s)
        : false;
      const ad = !(user.address === null)
        ? user.address.toLowerCase().includes(s)
        : false;
      return em || fn || ln || ad;
    },

    sortFn(a, b) {
      if (['user_id', 'role_id'].includes(this.sortBy)) {
        return this.sortType
          ? b[this.sortBy] - a[this.sortBy]
          : a[this.sortBy] - b[this.sortBy];
      } else if (this.sortBy === 'active') {
        if (this.sortType) {
          return a[this.sortBy] === b[this.sortBy]
            ? 0
            : a[this.sortBy]
            ? -1
            : 1;
        } else {
          return a[this.sortBy] === b[this.sortBy]
            ? 0
            : a[this.sortBy]
            ? 1
            : -1;
        }
      } else {
        return 0;
      }
    },

    onSortUsers(field) {
      this.sortBy = field;
      this.sortType = !this.sortType;
    },

    async onDeleteUser(user) {
      if (user.role_id === 6) {
        this.$toast.error('это же админ');
        return;
      }
      try {
        await this.$axios.$delete('/users/' + user.user_id);
        // this.$toast.success(`Пользователь ${user.email} удален`);
        this.users = this.users.filter((el) => el.user_id !== user.user_id);
      } catch (error) {
        const message = !error.response.data.result
          ? 'user already deleted '
          : error.response;
        console.error(error.message);
        // this.$toast.error(error.message);
      }
    },

    async onChangeUserState({ user_id, active }) {
      console.log(user_id, !active);
      try {
        await this.$axios.$put('/users/activate', {
          id: user_id,
          state: !active,
        });
        this.users.find((el) => el.user_id === user_id).active = !active;
      } catch (err) {
        console.error(err.message);
      }
    },

    sortingChanged(ctx) {
      this.filteredUsers.sort((a, b) => {
        if (ctx.sortBy === 'role_id') {
          return ctx.sortDesc
            ? b[ctx.sortBy] - a[ctx.sortBy]
            : a[ctx.sortBy] - b[ctx.sortBy];
        } else if (ctx.sortBy === 'active') {
          if (ctx.sortDesc)
            return a[ctx.sortBy] === b[ctx.sortBy] ? 0 : a[ctx.sortBy] ? -1 : 1;
          else
            return a[ctx.sortBy] === b[ctx.sortBy] ? 0 : a[ctx.sortBy] ? 1 : -1;
        } else if (ctx.sortBy === 'reg_date') {
          return ctx.sortDesc
            ? new Date(b[ctx.sortBy]) - new Date(a[ctx.sortBy])
            : new Date(a[ctx.sortBy]) - new Date(b[ctx.sortBy]);
        } else {
          return a.user_id - b.user_id;
        }
      });
    },
  },
};
</script>

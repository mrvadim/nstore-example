<template>
  <nav class="navbar">
    <!-- <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="~/assets/logo.png" />
      </router-link>
    </div> -->
    <div class="navbar-menu" :class="{ 'is-active': isActive }" id="navMenu">
      <nuxt-link class="navbar-item" to="/"> {{ $t('home') }} </nuxt-link>
      <nuxt-link
        class="navbar-item"
        v-if="$auth.loggedIn && isAdmin"
        to="/admin"
        >{{ $t('admin') }}
      </nuxt-link>
      <nuxt-link
        class="navbar-item"
        v-if="$auth.loggedIn && isManager"
        to="/manager"
      >
        {{ $t('manager') }}
      </nuxt-link>
      <nuxt-link
        class="navbar-item"
        v-if="$auth.loggedIn && isManager"
        to="/telegram"
      >
        {{ $t('telegram') }}
      </nuxt-link>
      <nuxt-link class="navbar-item" v-if="$auth.loggedIn" to="/profile">
        {{ $t('profile') }}
      </nuxt-link>
      <nuxt-link class="navbar-item" v-if="!$auth.loggedIn" to="/login">
        {{ $t('login') }}
      </nuxt-link>
      <a class="navbar-item" v-if="$auth.loggedIn" href @click.prevent="logout">
        {{ $t('logout') }}
      </a>
      <div class="navbar-item" v-if="$auth.loggedIn">
        {{ $t('welcome') }} {{ $auth.user.first_name }}
      </div>

      <nuxt-link class="navbar-item" to="/setup">
        {{ $t('setup') }}
      </nuxt-link>

      <div class="navbar-item" v-if="!$auth.loggedIn">
        {{ $t('welcome') }} {{ $t('guest') }}
      </div>
      <div class="navbar-item navbar-item-right">language:
      <a
        href="#"
        v-for="locale in availableLocales"
        :key="locale.code"
        @click.prevent.stop="$i18n.setLocale(locale.code)"
      >
        [ {{ locale.code }} ]
      </a>

      </div>

    </div>

    <!-- <li>
        ({{ $t("switch_to") }}:
        <a
          href="#"
          v-for="locale in availableLocales"
          :key="locale.code"
          @click.prevent.stop="$i18n.setLocale(locale.code)"
          >{{ locale.name }}</a
        >)
      </li> -->
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    isAdmin() {
      return this.$auth.user.role_id & this.$rights.admin;
    },
    isManager() {
      return this.$auth.user.role_id & this.$rights.manager;
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

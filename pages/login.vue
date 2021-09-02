<template>
  <div class="login flex-column flex-cy">
    <div class="mb-3">
      <h1 class="title">{{ $t("login") }}</h1>
    </div>

    <form @submit.prevent="loginUser">
      <!-- <div class="mb-3">
        <input
          class="input"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        />
      </div> -->
      <!-- <div class="mb-3">
        <input
          class="input"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
          autocomplete="off"
        />

      </div> -->
      <div class="mb-3">
        <ce-input-text class="input" v-model="form.email" placeholder="email"></ce-input-text>
      </div>

      <div class="mb-3">
        <ce-input-text type="password" v-model="form.password" class="input" placeholder="password" autocomplete="off"></ce-input-text>
      </div>

      <button class="button mb-3 w-100" type="submit">{{ $t("login") }}</button>
    </form>
    <p>
      {{ $t("reg_tip") }}
      <nuxt-link :to="`/register`">{{ $t("register2") }}</nuxt-link>
    </p>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  name: "login",
  layout: "auth",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.form,
        });
        // this.$auth.setUser(response.data);
        console.log(`Hello, ${response.data.first_name}`);
        this.$toast.success(`Hello, ${response.data.first_name}`);
      } catch (err) {
        console.error(err.response.data);
        this.$toast.error(`Error, ${err.response.data.message}`);
      }
    },
  },
};
</script>

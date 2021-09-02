<template>
  <div class="register flex-column flex-cy">
    <div class="mb-3">
      <h1 class="title">{{ $t("register") }}</h1>
    </div>

    <form @submit.prevent="registerUser">
      <div class="mb-3">
        <input
          v-model="form.name"
          type="text"
          required
          placeholder="enter name"
        />
      </div>

      <div class="mb-3">
        <input
          v-model="form.email"
          type="email"
          required
          placeholder="enter email"
        />
      </div>

      <div class="mb-3">
        <input
          v-model="form.password"
          type="password"
          required
          placeholder="enter password"
          autocomplete="off"
        />
      </div>

      <div class="mb-3">
        <input
          v-model="form.repeat"
          type="password"
          required
          placeholder="repeat password"
          autocomplete="off"
        />
      </div>

      <button block type="submit" variant="primary" class="mb-3 w-100">
        register
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: "register",
  layout: "auth",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        repeat: "",
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        const result = await this.$axios.$post("/users/create", this.form);
        console.log("created", result);
        this.$toast.success(`Registered, ${result}`);
      } catch (error) {
        console.error(error);
        this.$toast.error(`Error, ${error}`);
      }
    },
  },
};
</script>

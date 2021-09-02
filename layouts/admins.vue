<template>
  <div class="container center">
    <n-header></n-header>
    <Nuxt />
  </div>
</template>
<script>
export default {
  name: "admins",
  middleware: ['auth', 'isAdmin'],
  computed: {},
  methods: {},
};
</script>

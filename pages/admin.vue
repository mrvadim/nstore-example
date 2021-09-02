<template>
  <div class="">
    <div class="mb-2">
      <h1 class="title">{{ $t('admin_page') }}</h1>
    </div>
    <div class="mb-2">
      <ul class="admin_nav">
        <li><nuxt-link to="/admin/users" exact exact-active-class="active">{{ $t('users') }}</nuxt-link></li>
        <li><nuxt-link to="/admin/products" exact exact-active-class="active">{{ $t('products') }}</nuxt-link></li>
        <li><nuxt-link to="/admin/logs" exact exact-active-class="active">{{ $t('logs') }}</nuxt-link></li>
      </ul>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>
<script>
export default {
  name: 'admin',
  layout: 'admins',
  //middleware: ['auth', 'isAdmin'],
};
</script>

<template>
  <div class="">
    <div>
      <h1 class="title">Manager</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'manager',
  layout: 'empty',
  middleware: ['auth', 'isManager'],
};
</script>

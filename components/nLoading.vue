<template>
  <div class="loading flex-column flex-ai-c mb-3">
    <slot>Loading...</slot>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  padding: 1rem 0.5rem;
  border: 1px solid lightgrey;
}
</style>
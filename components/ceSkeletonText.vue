<template>
    <div class="skeleton"></div>
</template>

<script>
export default {
    props: ['length']
}
</script>

<style lang="scss" scoped>
.skeleton {
    width: 10rem;
    height: 1rem;
    background-color: lightgray;
    border: 2px;
}
</style>
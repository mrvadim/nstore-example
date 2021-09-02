<template>
  <div class="select-wrapper mb-3">
    <select
      class="w-100"
      :value="value"
      @input="$emit('input', Number($event.target.value))"
    >
      <option v-for="(option, idx) in options" :value="option.value" :key="idx">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number, default: 0 },
    options: { type: Array, required: true },
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.select-wrapper {
  select {
    height: 34px;
    border: 1px solid lighten($gray, 30%);
    border-radius: 2px;
    outline: none;
    padding: 4px;
    &:hover {
      border: 1px solid $black;
    }
  }
}
</style>
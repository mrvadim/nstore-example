<template>
  <div class="checkbox-wrapper flex-row flex-ai-c mb-3">
    <input
      type="checkbox"
      :checked="value"
      :disabled="disabled"
      @input="$emit('input', $event.target.checked)"
      :id="label"
    />
    <label :for="label">{{ label }}</label>
  </div>
</template>
<script>
export default {
  props: {
    value: { type: Boolean, default: true },
    label: { type: String, default: "label" },
    disabled: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  label {
    margin-left: 0.25rem;
  }
}
</style>

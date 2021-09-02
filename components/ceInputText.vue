<template>
  <div class="input-wrapper mb-3">
    <input
      :type="type"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
      placeholder=" "
      :autocomplete="autocomplete"
    />
    <span v-if="placeholder" class="floating-label">{{ placeholder }}</span>
  </div>
</template>

<script>
export default {
  name: "nInput",
  data() {
    return {};
  },
  props: {
    value: { type: String },
    placeholder: { type: String, default: "placeholder" },
    type: { type: String, default: "text" },
    autocomplete: { type: String, default: "on" },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;

  input {
    padding: 4px 8px;
    border: 1px solid lighten($gray, 30%);
    color: $black;
    outline: none;
    height: 34px;
    border-radius: 2px;
    width: 100%;
    &:hover {
      border: 1px solid $black;
    }
    &:focus {
      border: 1px solid $black;
    }
    &:focus ~ .floating-label {
      color: $black;
    }
    &:focus ~ .floating-label,
    &:not(:placeholder-shown) ~ .floating-label {
      top: -0.6rem;
      left: 1rem;
      font-size: 12px;
      opacity: 1;
      background-color: $white;
      padding: 0 0.2rem;
    }
  }

  .floating-label {
    color: $gray;
    position: absolute;
    pointer-events: none;
    transition: 0.1s ease all;
    text-transform: capitalize;
    left: 8px;
    top: 6px;
    font-size: 16px;
  }
}
</style>

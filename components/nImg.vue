<template>
  <svg
    :width="`${size}px`"
    :height="`${size}px`"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${size} ${size}`"
    preserveAspectRatio="none"
  >
    <rect width="100%" height="100%" :fill="`${color}`"></rect>
  </svg>
</template>
<script>
export default {
  props: ["size", "color"],
};
</script>


<template>
  <div id="modal" v-if="show">
    <div class="background" @click="$emit('close')"></div>
    <div class="window">
      <div v-if="header" class="header"><h3 class="title">{{header}}</h3></div>
      <slot name="header"></slot>
      <div class="body"><slot>default</slot></div>

      <slot name="footer"><div class="footer"><button @click="$emit('close')">close</button></div></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

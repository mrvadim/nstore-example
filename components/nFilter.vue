<template>
  <div class="filter flex-column mb-3">
    <div class="mb-3">
      <p>filter: {{ filterData }}</p>
      <p>text: {{ text }}</p>
      <p>checked: {{ checked }}</p>
      <p>selected: {{ select }}</p>
    </div>

    <ce-input-text placeholder="text" v-model="text" />

    <ce-select v-model="select" :options="options" />

    <ce-checkbox v-model="checked" label="в наличии" />

    <ce-double-slider
      :s1="dslider.priceMin"
      :s2="dslider.priceMax"
      @data="getData"
    />

    <div class="">
      <button class="w-100" @click="onFilter()">filter</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterData: { type: Object },
  },
  data() {
    return {
      params: null,
      text: "hello",
      checked: false,
      select: 2,
      options: [
        { value: null, text: "Choose" },
        { value: 1, text: "A" },
        { value: 2, text: "B" },
        { value: 3, text: "C" },
        { value: 4, text: "D" },
        { value: 5, text: "E" },
        { value: 6, text: "F" },
      ],
      dslider: this.filterData,
    };
  },
  computed: {},
  methods: {
    onFilter() {
      // console.log("filterdata", this.dslider.priceMin, this.dslider.priceMax);
      // console.log({
      //   text: this.text,
      //   checked: this.checked,
      //   select: this.select,
      //   slider: { min: this.dslider.min, max: this.dslider.max },
      // });
      this.$emit("filtered", {
        min: this.dslider.priceMin,
        max: this.dslider.priceMax,
        in_stock: this.checked,
      });
    },
    getData(val) {
      this.dslider.priceMin = val.min;
      this.dslider.priceMax = val.max;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  padding: 1rem 0.5rem;
  border: 1px solid gray;
}
</style>

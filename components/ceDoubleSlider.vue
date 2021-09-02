<template>
  <div class="slider-wrapper mb-3">
    <div class="flex-row flex-jc-sb">
      <p>min: {{ slider1 }}</p>
      <p>max: {{ slider2 }}</p>
    </div>

    <div class="slider-track" :style="{ background: trackBackground }"></div>
    <input
      type="range"
      :min="sliderMin"
      :max="sliderMax"
      :step="sliderStep"
      v-model.number="slider1"
      @change="change"
    />
    <input
      type="range"
      :min="sliderMin"
      :max="sliderMax"
      :step="sliderStep"
      v-model.number="slider2"
      @change="change"
    />
  </div>
</template>

<style lang="scss" scoped>
.slider-wrapper {
  width: 100%;
  height: 3rem;
  position: relative;

  input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    outline: none;
    position: absolute;
    top: 2rem;
    margin: auto;
    background-color: transparent;
    pointer-events: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
  }
  input[type="range"]::-moz-range-track {
    -moz-appearance: none;
    height: 5px;
  }
  input[type="range"]::-ms-track {
    appearance: none;
    height: 5px;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1rem;
    height: 1rem;
    margin-top: -5px;
    border: 1px solid black;
    border-radius: 2px;
    cursor: pointer;
    pointer-events: auto;
    background-color: #3264fe;
  }
  input[type="range"]::-moz-range-thumb {
    -moz-appearance: none;
    width: 1rem;
    height: 1rem;
    border: 1px solid black;
    cursor: pointer;
    pointer-events: auto;
    background-color: #3264fe;
  }
  input[type="range"]::-ms-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 1px solid black;
    cursor: pointer;
    pointer-events: auto;
    background-color: #3264fe;
  }
  input[type="range"]:active::-webkit-slider-thumb {
    background-color: white;
  }
  .slider-track {
    width: 100%;
    height: 5px;
    position: absolute;
    margin: auto;
    top: 2rem;
    border-radius: 2px;
  }
}
</style>

<script>
export default {
  props: {
    s1: { type: Number, default: 0 },
    s2: { type: Number, default: 100 },
    sliderMin: {
      type: Number,
      default: function () {
        return this.s1;
      },
    },
    sliderMax: {
      type: Number,
      default: function () {
        return this.s2;
      },
    },
    sliderStep: { type: Number, default: 1 },
    sliderGap: { type: Number, default: 10 },
  },
  data() {
    return {
      val1: this.s1,
      val2: this.s2,
    };
  },
  computed: {
    slider1percent() {
      return (
        ((this.val1 - this.sliderMin) / (this.sliderMax - this.sliderMin)) * 100
      );
    },
    slider2percent() {
      return (
        ((this.val2 - this.sliderMin) / (this.sliderMax - this.sliderMin)) * 100
      );
    },
    trackBackground() {
      return `linear-gradient(to right,
            #dadae5 ${this.slider1percent}%,
            #3264fe ${this.slider1percent}%,
            #3264fe ${this.slider2percent}%,
            #dadae5 ${this.slider2percent}%)`;
    },
    slider1: {
      get() {
        return this.val1;
      },
      set(newVal) {
        if (newVal > this.val2 - this.sliderGap)
          this.val2 = newVal + this.sliderGap;
        this.val1 = newVal;
      },
    },
    slider2: {
      get() {
        return this.val2;
      },
      set(newVal) {
        if (newVal < this.val1 + this.sliderGap)
          this.val1 = newVal - this.sliderGap;
        this.val2 = newVal;
      },
    },
  },
  methods: {
    change() {
      this.$emit("data", { min: this.val1, max: this.val2 });
    },
  },
};
</script>

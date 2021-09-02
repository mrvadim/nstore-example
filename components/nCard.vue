<template>
  <div class="card">
    <div v-if="showCategory" class="p-2">
      <nuxt-link :to="`catalog/${product.c_url}`">
        {{ product.c_name }}
      </nuxt-link>
    </div>

    <div class="flex-column flex-ai-c">
      <img v-if="product.image" class="image" :src="imageUrl" alt="image" />
      <n-img v-else class="image" :size="100" color="lightgray"></n-img>
    </div>

    <div class="card-text p-2">
      <div class="mb-2">
        <ce-skeleton-text v-if="skeleton" />
        <nuxt-link v-else :to="`/product/${product.p_url}`">
          <h3>{{ product.name }}</h3>
        </nuxt-link>
      </div>

      <div class="">
        <ce-skeleton-text v-if="skeleton" />
        <p v-else>{{ isDisabled ? "отсутствует" : "в наличии" }}</p>
      </div>
    </div>

    <div class="card-footer p-2">
      <ce-skeleton-text v-if="skeleton" />
      <div v-else class="flex-row flex-jc-sb flex-ai-c">
        <p>{{ product.price }} руб.</p>
        <button :disabled="isDisabled">buy</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      default: function () {
        return {};
      },
    },
    skeleton: { type: Boolean, default: false },
    showCategory: { type: Boolean, default: false },
  },
  data() {
    return {
      p: {
        product_id: 1,
      },
    };
  },
  computed: {
    imageUrl() {
      const DEF_IMG = `/no_image.jpg`;
      return this.product.image !== null ? `/${this.product.image}` : DEF_IMG;
    },
    isDisabled() {
      return !this.product.in_stock;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  > .card-text {
    margin-top: auto;
  }
  .card-footer {
    background-color: lightgrey;
  }
  h3 {
    text-transform: capitalize;
  }
  a {
    color: black;
    text-decoration: none;
  }
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>




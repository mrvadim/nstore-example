<template>
  <div class="product">
    <div class="product-title mb-3">
      <h1 class="title">
        {{ productName }}
      </h1>
      <p class="subtitle">code: {{ product.product_id }}</p>
    </div>
    <!-- <div>{{ product }}</div> -->
    <div class="product-info">
      <div class="product-info-main flex-row mb-3">
        <div class="product-info-main-image flex-2 flex-column flex-ai-c">
          <img v-if="product.image" :src="imageUrl" alt="image" />
          <n-img v-else :size="100" color="lightgray"></n-img>
        </div>
        <div class="product-info-main-btns flex-1 border p-3">
          <p>wishlist: {{ product.wishlist || "no" }}</p>
          <p>compare +</p>
          <p>comments: {{ comments_count }}</p>
          <p>в наличии: {{ product.in_stock }}</p>
          <p>price: {{ product.price }} руб.</p>
          <button :disabled="!product.in_stock">basket</button>
        </div>
      </div>
      <ce-line></ce-line>
      <div class="product-info-specs mb-3">
        <div class="title mb-3">
          <h3>desc and specs</h3>
        </div>
        <p v-if="product.description" class="mb-3">{{ product.description }}</p>
        <p v-for="(val, name, idx) in product.specs" :key="idx">
          {{ name }} - {{ val }}
        </p>
      </div>
      <ce-line></ce-line>
      <div class="product-info-comments mb-3">
        <div class="title mb-3">
          <h3>comments</h3>
        </div>
        <p v-if="comments_count">{{ product.comments }}</p>
        <p v-else>no comments</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.product {
  .product-info-main {
    // background: lightgreen;
    .product-info-main-image {
      // background-color: lightskyblue;
      img {
        width: 20rem;
        height: 20rem;
      }
    }
    .product-info-main-btns {
      // background-color: lightyellow;
    }
  }
  .product-info-specs {
    // background: lightgreen;
  }
  .product-info-comments {
    // background-color: lightgreen;
  }
}
</style>

<script>
export default {
  name: "pruduct-url",
  async fetch() {
    console.log(this.$route.params.url);
    try {
      this.product = await this.$axios.$get(
        "/products/" + this.$route.params.url
      );
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      product: {},
    };
  },
  computed: {
    comments_count() {
      return parseInt(this.product.comments_count);
    },
    productName() {
      return this.product ? this.product.name : "loading";
    },
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

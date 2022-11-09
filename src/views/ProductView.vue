<template>
  <main>
    <div class="global-container">
      <a href="#" class="go-back" @click="router.back()">Go back</a>
      <ProductDetail :product="product"></ProductDetail>
      <Menu></Menu>
      <Branding></Branding>
    </div>
  </main>
</template>

<script>
import { useProductsStore } from "../store/products";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Menu from "../components/Menu.vue";
import Branding from "../components/Branding.vue";
import ProductDetail from "../components/ProductDetail.vue";

export default {
  name: "ProductView",
  components: {
    Menu,
    Branding,
    ProductDetail,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const productsStore = useProductsStore();
    // get the product with the slug, refer to /store/product.js
    const product = productsStore.getProducts.find(
      (element) => element.slug === route.params.slug
    );
    // scroll to the start of the page when first loaded
    onMounted(() => {
      window.scrollTo(0, 0);
    });

    return {
      router,
      productsStore,
      product,
    };
  },
};
</script>

<style scoped lang="scss">
main {
  .global-container {
    .go-back {
      display: block;
      text-decoration: none;
      margin-top: 79px;
      font-weight: 500;
      font-size: 15px;
      line-height: 25px;
      mix-blend-mode: normal;
      color: #000;
      opacity: 0.5;

      &:hover {
        color: #d87d4a;
        opacity: 1;
      }
    }
  }
}
@media (max-width: 800px) {
  main {
    .global-container {
      .go-back {
        margin-top: 32px;
      }
    }
  }
}
</style>

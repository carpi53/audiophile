<script setup>
import ProductItem from "./ProductItem.vue"
defineProps({
  products: Array,
});
</script>
<template>
  <div class="product-grid">
    <ProductItem v-for="product in products" :productItem="product" :key="product" />
  </div>
</template>

<style lang="scss">
.product-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 160px 0 200px;
}

@media (max-width: 800px) {
  .product-grid {
    margin: 120px 0 160px;
  }
}

@media (max-width: 500px) {
  .product-grid {
    margin: 64px 0 130px;
  }
}
</style>

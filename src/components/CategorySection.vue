<script setup>
defineProps({
  products: Array,
  category: String
});
//import
import HeaderCategory from "../components/HeaderCategory.vue";
import Menu from "../components/Menu.vue";
import Branding from "../components/Branding.vue";
import ProductGrid from "../components/ProductGrid.vue";
import { onMounted } from "vue";

// scroll to the start of the page when first loaded
onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <main>
    <HeaderCategory :category="category"></HeaderCategory>
    <div class="global-container">
      <ProductGrid :products="products"></ProductGrid>
      <Menu></Menu>
      <Branding></Branding>
    </div>
  </main>
</template>

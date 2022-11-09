<script setup>
import { useProductsStore } from "../store/products";
import { ref } from "vue";
import CategorySection from "../components/CategorySection.vue";
const productsStore = useProductsStore();
const category = ref("Earphones");
</script>

<template>
  <CategorySection :products="productsStore.getEarphones" :category="category"></CategorySection>
</template>

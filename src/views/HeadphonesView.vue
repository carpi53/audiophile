<script setup>
import { useProductsStore } from "../store/products";
import { ref } from "vue";
import CategorySection from "../components/CategorySection.vue";
const productsStore = useProductsStore();
const category = ref("Headphones");
</script>

<template>
  <CategorySection :products="productsStore.getHeadphones" :category="category"></CategorySection>
</template>

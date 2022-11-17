<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import FooterSection from "./components/FooterSection.vue";
import Cart from "./components/Cart.vue";
</script>

<template>
  <div class="header-background"></div>
  <header>
    <NavBar></NavBar>
  </header>
  <Cart></Cart>
  <RouterView :key="$route.fullPath" />
  <FooterSection></FooterSection>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Manrope:200,300,400,500,600,700,800,900");

.header-background {
  width: 100%;
  height: 97px;
  background: #000;
  position: relative;
  z-index: -1;
}
</style>

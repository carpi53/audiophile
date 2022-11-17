<script setup>
import { RouterLink } from "vue-router";
import { useProductsStore } from "../store/products";
import { ref } from "vue";
import HeroBanner from "../components/HeroBanner.vue";
import MainBanner from "../components/MainBanner.vue";
import Banner from "../components/Banner.vue";
import SecondaryBanner from "../components/SecondaryBanner.vue";
import Menu from "../components/Menu.vue";
import Branding from "../components/Branding.vue";
import { onMounted } from "vue";

const productsStore = useProductsStore();
const heroText = ref(
  "Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast."
);

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <main>
    <HeroBanner
      :product="productsStore.getHeroProduct"
      :heroText="heroText"
    ></HeroBanner>
    <div class="global-container-home">
      <Menu></Menu>
      <MainBanner :product="productsStore.getMainBannerProduct"></MainBanner>
      <Banner :product="productsStore.getBannerProduct"></Banner>
      <SecondaryBanner
        :product="productsStore.getSecondaryBannerProduct"
      ></SecondaryBanner>
      <Branding></Branding>
    </div>
  </main>
</template>

<style lang="scss">
main {
  width: 100%;
  padding-bottom: 160px;
  .global-container-home {
    max-width: 1150px;
    padding: 0 25px;
    margin: 100vh auto 0;
  }
}
@media (max-width: 800px) {
  main {
    padding-bottom: 120px;
  }
}
</style>

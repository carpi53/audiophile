<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Checkout from "../components/Checkout.vue";

const router = useRouter();

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <main>
    <div class="global-container">
      <a href="#" class="go-back" @click="router.back()">Go back</a>
      <Checkout></Checkout>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  padding-top: 79px;
  background-color: #F2F2F2;
  .global-container {
    .go-back {
      display: block;
      text-decoration: none;
      font-weight: 500;
      font-size: 15px;
      line-height: 25px;
      mix-blend-mode: normal;
      color: #000;
      opacity: 0.5;
      margin-bottom: 38px;

      &:hover {
        color: #d87d4a;
        opacity: 1;
      }
    }
  }
}
@media (max-width: 850px) {
  main {
    padding-top: 32px;
    .global-container {
      .go-back {
        margin-bottom: 24px;
      }
    }
  }
}
</style>

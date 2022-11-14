<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useCartStore } from "../store/cart";
const cartStore = useCartStore();
defineProps({
  reveal: Boolean,
});

onBeforeRouteLeave((to, from) => {
  cartStore.removeAll();
});
</script>
<template>
  <div class="confirmation" v-if="reveal">
    <Teleport to="body">
      <div class="overlay"></div>
    </Teleport>
    <div class="confirmation-content">
      <img
        src="/assets/checkout/icon-order-confirmation.svg"
        alt="icone de confirmation"
      />
      <h3>THANK YOU FOR YOUR ORDER</h3>
      <p class="description">You will receive an email confirmation shortly.</p>
      <RouterLink to="/" class="btn-primary checkout">back to home</RouterLink>
    </div>
  </div>
</template>
<style scoped lang="scss">
.confirmation {
  width: 100%;
  height: 100%;

  .confirmation-content {
    background: #fff;
    max-width: 540px;
    width: 100%;
    border-radius: 8px;
    padding: 48px 30px 30px;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;

    img {
      margin-bottom: 30px;
    }

    h3 {
      margin-bottom: 24px;
    }

    .description {
      margin-bottom: 33px;
    }
  }

  .btn-primary.checkout {
    display: block;
    width: 100%;
    text-align: center;
  }
}
</style>

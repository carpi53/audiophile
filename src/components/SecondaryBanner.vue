<script setup>
defineProps({
  product: Object,
});
</script>
<template>
  <section class="secondary-banner">
    <div class="secondary-banner-img"></div>
    <div class="secondary-banner-info">
      <h4>{{ product.name }}</h4>
      <RouterLink :to="{name: 'product', params: {slug: product.slug}}" class="btn-secondary">see product</RouterLink>
    </div>
  </section>
</template>
<style scoped lang="scss">
.secondary-banner {
  display: flex;
  height: 320px;
  margin-bottom: 100px;
  .secondary-banner-img {
    width: 50%;
    background-image: url("@/assets/home/desktop/image-earphones-yx1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    margin-right: clamp(10px, 3vw, 30px);
  }

  .secondary-banner-info {
    width: 50%;
    background: #f1f1f1;
    border-radius: 8px;
    padding-top: 100px;
    padding-left: 7vw;
    h4 {
      margin-bottom: 32px;
    }
  }
}

@media (max-width: 500px) {
  .secondary-banner {
    flex-direction: column;
    height: 424px;

    .secondary-banner-img {
      width: 100%;
      height: 200px;
      margin-right: 0;
      margin-bottom: 24px;
    }

    .secondary-banner-info {
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 0;
    }

  }
}
</style>

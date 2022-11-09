<script setup>
defineProps({
  product: Object,
});
</script>
<template>
  <section class="banner">
    <div class="banner-info">
      <h4>{{ product.name }}</h4>
      <RouterLink :to="{ name: 'product', params: { slug: product.slug } }" class="btn-secondary">see product</RouterLink>
    </div>
  </section>
</template>
<style scoped lang="scss">
.banner {
  width: 100%;
  height: 320px;
  background-image: url("/src/assets/home/desktop/image-speaker-zx7.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: 48px;
  border-radius: 8px;
  position: relative;

  .banner-info {
    width: 30%;
    height: auto;
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    left: 6vw;
    z-index: 1;

    h4 {
      margin-bottom: 32px;
    }
  }
}

@media (max-width: 800px) {
  .banner {
    background-image: url("/src/assets/home/tablet/image-speaker-zx7.jpg");
    .banner-info {
      width: 50%;
    }
  }
}

@media (max-width: 500px) {
  .banner {
    background-image: url("/src/assets/home/mobile/image-speaker-zx7.jpg");
    .banner-info {
      width: 90%;
    }
  }
}
</style>

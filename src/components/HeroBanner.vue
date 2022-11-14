<script setup>
defineProps({
  product: Object,
  heroText: String,
});
</script>
<template>
  <section class="hero">
    <div class="hero-container">
      <hr />
      <div class="hero-content">
        <div class="hero-product-info">
          <p class="overline">new product</p>
          <h1>{{ product.name }}</h1>
          <p>{{ heroText }}</p>
          <RouterLink :to="{name: 'product', params: {slug: product.slug}}" class="btn-primary">see product</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.hero {
  padding-top: 96px;
  width: 100%;
  height: 100vh;
  background-image: url("/assets/home/desktop/image-hero.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  z-index: 1;
  top: 0;

  .hero-container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 25px;

    hr {
      width: 100%;
      max-width: 1110px;
      height: 1px;
      background-color: #f1f1f1;
      margin-bottom: 128px;
      opacity: 0.75;
    }

    .hero-content {
      width: 100%;
      max-width: 1100px;

      .hero-product-info {
        width: 398px;
        height: 346px;

        .overline {
          color: #f1f1f1;
          margin-bottom: 24px;
        }
        h1 {
          color: #fff;
          margin-bottom: 24px;
        }
        p {
          padding-right: 50px;
          color: #fff;
          margin-bottom: 40px;
          font-weight: 500;
          font-size: 15px;
          line-height: 25px;
          mix-blend-mode: normal;
          opacity: 0.75;
        }
      }
    }
  }
}

@media (max-width: 800px) {
  .hero {
    background-image: url("/assets/home/tablet/image-header.jpg");
    .hero-container {
      .hero-content {
        .hero-product-info {
          width: 80%;
          margin: 0 auto;
          text-align: center;
          p {
            padding-right: 0;
          }
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .hero {
    background-image: url("/assets/home/mobile/image-header.jpg");
    .hero-container {
      padding: 0;
      hr{
        margin-bottom: 108px;
      }
    }
  }
}
</style>

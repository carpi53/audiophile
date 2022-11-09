<script setup>
defineProps({
  product: Object,
});
</script>
<template>
  <section class="main-banner">
    <img
      src="@/assets/home/desktop/pattern-circles.svg"
      alt="circles pattern"
      class="circle-pattern"
    />
    <img
      src="@/assets/home/desktop/image-speaker-zx9.png"
      alt="speaker zx9"
      class="main-banner-img"
    />
    <div class="main-banner-info">
      <h1>{{ product.name }}</h1>
      <p>
        Upgrade to premium speakers that are phenomenally built to deliver truly
        remarkable sound.
      </p>
      <RouterLink
        :to="{ name: 'product', params: { slug: product.slug } }"
        class="btn-tertiary"
        >see product</RouterLink
      >
    </div>
  </section>
</template>
<style scoped lang="scss">
.main-banner {
  width: 100%;
  height: 560px;
  background-color: #d87d4a;
  margin: 100px 0 38px;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  overflow: hidden;

  .circle-pattern {
    width: 950px;
    position: absolute;
    top: -70px;
    left: -150px;
    z-index: 2;
  }

  .main-banner-img {
    width: 410px;
    height: auto;
    position: absolute;
    bottom: -10px;
    left: 117px;
    z-index: 3;
  }

  .main-banner-info {
    width: 30%;
    height: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 6vw;
    z-index: 3;

    h1 {
      color: #fff;
      margin-bottom: 24px;
    }
    p {
      font-weight: 500;
      font-size: 15px;
      line-height: 25px;
      color: #ffffff;
      mix-blend-mode: normal;
      opacity: 0.75;
      margin-bottom: 40px;
    }
  }
}

@media (max-width: 1000px) {
  .main-banner {
    .circle-pattern {
      left: -240px;
    }
    .main-banner-img {
      left: 40px;
    }
  }
}

@media (max-width: 800px) {
  .main-banner {
    height: 720px;
    .circle-pattern {
      width: 100%;
      position: absolute;
      top: -150px;
      left: 0;
      z-index: 2;
    }

    .main-banner-img {
      width: 200px;
      top: 52px;
      left: 50%;
      transform: translateX(-50%);
    }

    .main-banner-info {
      width: 50%;
      bottom: 5%;
      transform: translateX(-50%);
      left: 50%;
      z-index: 3;
      text-align: center;
    }
  }
}

@media (max-width: 650px) {
  .main-banner {
    .circle-pattern {
      top: -90px;
    }
  }
}

@media (max-width: 500px) {
  .main-banner {
    height: 600px;
    .circle-pattern {
      top: -50px;
    }
    .main-banner-info {
      width: 90%;
      bottom: 1%;
      h1{
        margin-top: 20px;
      }
    }
  }
}
</style>

<script setup>
//import
import { useScreenStore } from "../store/screen";
import { computed,ref } from "vue"
defineProps({
  product: Object,
});

// function that change the image according to the screen size
const changeImage = computed(() => {
  if (screenWidth.value < 500) {
    return "/src/assets/shared/mobile/image-best-gear.jpg";;
  } else if (screenWidth.value < 800) {
    return "/src/assets/shared/tablet/image-best-gear.jpg";
  } else {
    return "/src/assets/shared/desktop/image-best-gear.jpg";
  }
});

// get the pinia store to set the screen size 
const screenStore = useScreenStore();

let screenWidth = ref(screenStore.getScreenWidth);

// set the screen by listening the resize of the page
window.addEventListener("resize", handleScreenListener);

function handleScreenListener() {
  screenStore.setWindowWidth();
  screenWidth.value = screenStore.getScreenWidth;
}
</script>
<template>
  <section class="branding">
    <div class="branding-content">
      <div class="branding-description">
        <h2>Bringing you the <span>best</span> audio gear</h2>
        <p class="description">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </div>
    <img
      :src="changeImage"
      alt="un homme qui utilise le xx99 headphone"
      class="branding-img"
    />
  </section>
</template>
<style scoped lang="scss">
.branding {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 160px;

  .branding-content {
    width: 50%;
    display: flex;
    align-items: center;
    .branding-description {
      width: 80%;
      h2 {
        margin-bottom: 32px;
        span {
          color: #d87d4a;
        }
      }
    }
  }
  .branding-img {
    width: 50%;
    border-radius: 8px;
    object-fit: cover;
    object-position: center;
  }
}

@media (max-width: 800px) {
  .branding {
    margin-top: 120px;
    flex-direction: column-reverse;
    .branding-img {
      width: 100%;
    }
    .branding-content {
      width: 100%;
      .branding-description{
        width: 100%;
        margin: 63px auto 0;
        text-align: center;
      }
    }
  }
}
</style>

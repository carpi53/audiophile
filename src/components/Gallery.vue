<script setup>
import { computed, ref } from "vue";
import { useScreenStore } from "../store/screen";
const props = defineProps({
  product: Object,
});
// change the first Image of the gallery according to screen size
const changeFirstImage = computed(() => {
  if (screenWidth.value < 500) {
    return props.product.gallery.first.mobile.replace(".", "..");
  } else if (screenWidth.value < 950) {
    return props.product.gallery.first.tablet.replace(".", "..");
  } else {
    return props.product.gallery.first.desktop.replace(".", "..");
  }
});
// change the second Image of the gallery according to screen size
const changeSecondImage = computed(() => {
  if (screenWidth.value < 500) {
    return props.product.gallery.second.mobile.replace(".", "..");
  } else if (screenWidth.value < 950) {
    return props.product.gallery.second.tablet.replace(".", "..");
  } else {
    return props.product.gallery.second.desktop.replace(".", "..");
  }
});
// change the third Image of the gallery according to screen size
const changeThirdImage = computed(() => {
  if (screenWidth.value < 500) {
    return props.product.gallery.third.mobile.replace(".", "..");
  } else if (screenWidth.value < 950) {
    return props.product.gallery.third.tablet.replace(".", "..");
  } else {
    return props.product.gallery.third.desktop.replace(".", "..");
  }
});

// get the pinia store to set the screen size 
const screenStore = useScreenStore();
let screenWidth = ref(screenStore.getScreenWidth);

// set the screen size by listening the resize of the page
window.addEventListener("resize", handleScreenListener);

function handleScreenListener() {
  screenStore.setWindowWidth();
  screenWidth.value = screenStore.getScreenWidth;
}
</script>
<template>
  <section class="gallery">
    <img
      :src="changeFirstImage"
      class="gallery-first-img"
      :alt="`first gallery image of ${product.name}`"
    />
    <img
      :src="changeSecondImage"
      class="gallery-second-img"
      :alt="`second gallery image of ${product.name}`"
    />
    <img
      :src="changeThirdImage"
      class="gallery-third-img"
      :alt="`third gallery image of ${product.name}`"
    />
  </section>
</template>
<style scoped lang="scss">
.gallery {
  max-width: 100%;
  margin-bottom: 160px;
  display: grid;
  grid-template: 1fr 1fr / 4fr 6fr;
  grid-gap: clamp(10px, 2.5vw, 30px);
  grid-template-areas:
    "first third"
    "second third";

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
    object-position: center;
  }

  .gallery-first-img {
    grid-area: first;
  }

  .gallery-second-img {
    grid-area: second;
  }

  .gallery-third-img {
    grid-area: third;
  }
}
@media (max-width: 800px) {
  .gallery {
    margin-bottom: 120px;
  }
}

@media (max-width: 500px) {
  .gallery {
    margin-bottom: 120px;
    grid-template: 1fr 1fr 2fr/ 1fr;
    grid-template-areas:
    "first"
    "second"
    "third";
  }
}
</style>

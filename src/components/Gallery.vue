<script setup>
import { computed, ref } from "vue";
import { useScreenStore } from "../store/screen";
const props = defineProps({
  product: Object,
});
const changeFirstImage = computed(() => {
  if (screenWidth.value < 500) {
    return props.product.gallery.first.mobile.replace(".", "");
  } else if (screenWidth.value < 950) {
    return props.product.gallery.first.tablet.replace(".", "");
  } else {
    return props.product.gallery.first.desktop.replace(".", "");
  }
});

const changeSecondImage = computed(() => {
  if (screenWidth.value < 500) {
    return props.product.gallery.second.mobile.replace(".", "");
  } else if (screenWidth.value < 950) {
    return props.product.gallery.second.tablet.replace(".", "");
  } else {
    return props.product.gallery.second.desktop.replace(".", "");
  }
});

const changeThirdImage = computed(() => {
  if (screenWidth.value < 500) {
    return props.product.gallery.third.mobile.replace(".", "");
  } else if (screenWidth.value < 950) {
    return props.product.gallery.third.tablet.replace(".", "");
  } else {
    return props.product.gallery.third.desktop.replace(".", "");
  }
});

const altImageFirst = computed(() => {
  return "first gallery image of " + props.product.name;
});

const altImageSecond = computed(() => {
  return "second gallery image of " + props.product.name;
});

const altImageThird = computed(() => {
  return "third gallery image of " + props.product.name;
});

const screenStore = useScreenStore();

let screenWidth = ref(screenStore.getScreenWidth);
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
      :alt="altImageFirst"
    />
    <img
      :src="changeSecondImage"
      class="gallery-second-img"
      :alt="altImageSecond"
    />
    <img
      :src="changeThirdImage"
      class="gallery-third-img"
      :alt="altImageThird"
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

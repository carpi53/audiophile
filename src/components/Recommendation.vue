<template>
  <section class="recommendation">
    <h3>you may also like</h3>
    <div class="recommendation-container">
      <div
        v-for="(other, index) in product.others"
        :key="index"
        class="recommendation-product"
      >
        <img :src="changeImage(index)" class="product-img" :alt="altImage" />
        <div class="product-info">
          <h5>{{ other.name }}</h5>
          <RouterLink
            :to="{ name: 'product', params: { slug: other.slug }, force: true }"
            class="btn-primary"
            >see product</RouterLink
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import { useScreenStore } from "../store/screen";
export default {
  name: "Recommendation",
  props: {
    product: Object,
  },
  setup(props) {
    function changeImage(position) {
      if (screenWidth.value < 500) {
        return props.product.others[position].image.mobile.replace(".", "");
      } else if (screenWidth.value < 950) {
        return props.product.others[position].image.tablet.replace(".", "");
      } else {
        return props.product.others[position].image.desktop.replace(".", "");
      }
    }

    const altImage = computed(() => {
      return "recommendation of " + props.product.name;
    });

    const screenStore = useScreenStore();

    let screenWidth = ref(screenStore.getScreenWidth);
    window.addEventListener("resize", handleScreenListener);

    function handleScreenListener() {
      screenStore.setWindowWidth();
      screenWidth.value = screenStore.getScreenWidth;
    }

    return {
      changeImage,
      altImage
    };
  },
};
</script>

<style scoped lang="scss">
.recommendation {
  width: 100%;
  margin: 160px 0;

  h3 {
    text-align: center;
    margin-bottom: 64px;
  }

  .recommendation-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .recommendation-product {
      width: 33%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .product-img {
        width: 100%;
        height: 60%;
        border-radius: 8px;
        object-fit: cover;
        object-position: center;
      }

      .product-info {
        width: 100%;
        height: 40%;
        text-align: center;
        h5 {
          margin-top: 40px;
          margin-bottom: 32px;
        }
      }
    }
    .recommendation-product:not(:last-child) {
      margin-right: clamp(5px, 2.5vw, 30px);
    }
  }
}
@media (max-width: 500px) {
  .recommendation {
    .recommendation-container {
      flex-direction: column;
      .recommendation-product {
        width: 100%;
        .product-info {
          h5 {
            margin-top: 32px;
          }
          .btn-primary {
            display: block;
            width: 160px;
            margin: 0 auto;
          }
        }
      }
      .recommendation-product:not(:last-child) {
        margin-bottom: 56px;
      }
    }
  }
}
</style>

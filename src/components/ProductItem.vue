<template>
  <div class="product">
    <img :src="changeImage" class="product-img" :alt="productItem.name" />
    <div class="product-info">
      <p v-if="productItem.new" class="overline">new product</p>
      <h2>{{ productItem.name }}</h2>
      <p class="description">{{ productItem.description }}</p>
      <RouterLink
        :to="{ name: 'product', params: { slug: productItem.slug } }"
        class="btn-primary"
        >see product</RouterLink>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useScreenStore } from "../store/screen";
export default {
  name: "ProductItem",
  props: {
    productItem: Object,
  },
  setup(props) {
    // change the image according to the screen size
    const changeImage = computed(() => {
      if (screenWidth.value < 500) {
        return `/src/${props.productItem.categoryImage.mobile.replace(".", "")}`;       
      } else if (screenWidth.value < 800) {
        return `/src/${props.productItem.categoryImage.tablet.replace(".", "")}`;
      } else {
        return `/src/${props.productItem.categoryImage.desktop.replace(".", "")}`;
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

    return {
      changeImage,
    };
  },
};
</script>

<style scoped lang="scss">
.product {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .product-info {
    width: 37%;
    .overline {
      margin-bottom: 16px;
    }
    h2 {
      margin-bottom: 32px;
    }
    .description {
      margin-bottom: 40px;
    }
  }
  .product-img {
    width: 50%;
    border-radius: 8px;
    object-fit: cover;
    object-position: center;
  }
}
.product:nth-child(even) {
  flex-direction: row-reverse;
}

.product:not(:last-child) {
  margin-bottom: 160px;
}

@media (max-width: 800px) {
  .product {
    flex-direction: column;
    .product-img {
      width: 100%;
      margin-bottom: 52px;
    }
    .product-info {
      width: 80%;
      text-align: center;
      .btn-primary {
        display: block;
        width: 160px;
        margin: 0 auto;
      }
    }
  }
  .product:nth-child(even) {
    flex-direction: column;
  }
  .product:not(:last-child) {
    margin-bottom: 120px;
  }
}

@media (max-width: 500px) {
  .product {
    .product-img {
      margin-bottom: 32px;
      height: 100%;
    }
    .product-info {
      width: 90%;
      h2 {
        margin-bottom: 24px;
      }
      .description {
        margin-bottom: 24px;
      }
    }
  }
}
</style>

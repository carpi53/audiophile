<template>
  <div class="product-container">
    <div class="product">
      <img :src="changeImage" class="product-img" :alt="product.name" />
      <div class="product-info">
        <p v-if="product.new" class="overline">new product</p>
        <h2>{{ product.name }}</h2>
        <p class="description">{{ product.description }}</p>
        <p class="price">
          $ {{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
        </p>
        <div class="add-to-cart">
          <div class="input-group">
            <button class="btn-minus" @click="stepDown">-</button>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              v-model="quantity"
            />
            <button class="btn-plus" @click="stepUp">+</button>
          </div>
          <button type="button" class="btn-primary" @click="addToCart">
            add to cart
          </button>
        </div>
      </div>
    </div>
    <div class="product-additional-information">
      <div class="features">
        <h3>features</h3>
        <p class="description">
          {{ product.features }}
        </p>
      </div>
      <div class="in-the-box">
        <h3>in the box</h3>
        <div class="box-item-container">
          <div class="box-item" v-for="item in product.includes" :key="item">
            <span class="item-quantity">{{ item.quantity }}x</span>
            <span class="item-name">{{ item.item }}</span>
          </div>
        </div>
      </div>
    </div>
    <Gallery :product="product"></Gallery>
    <Recommendation :product="product"></Recommendation>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useScreenStore } from "../store/screen";
import { useCartStore } from "../store/cart";
import Gallery from "./Gallery.vue";
import Recommendation from "./Recommendation.vue";
export default {
  name: "Product",
  props: {
    product: Object,
  },
  components: {
    Gallery,
    Recommendation,
  },
  setup(props) {
    const changeImage = computed(() => {
      if (screenWidth.value < 500) {
        return props.product.image.mobile.replace(".", "");
      } else if (screenWidth.value < 950) {
        return props.product.image.tablet.replace(".", "");
      } else {
        return props.product.image.desktop.replace(".", "");
      }
    });

    const screenStore = useScreenStore();

    let screenWidth = ref(screenStore.getScreenWidth);
    window.addEventListener("resize", handleScreenListener);

    function handleScreenListener() {
      screenStore.setWindowWidth();
      screenWidth.value = screenStore.getScreenWidth;
    }

    const quantity = ref(1);

    const stepUp = function () {
      quantity.value++;
    };

    const stepDown = function () {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    const cartStore = useCartStore();

    function addToCart() {
      const index = cartStore.cart.findIndex(
        (element) => element.name === props.product.name
      );
      if (index != -1) {
        cartStore.cart[index].quantity =
          cartStore.cart[index].quantity + quantity.value;
        localStorage.setItem(
          cartStore.cart[index].name,
          JSON.stringify(cartStore.cart[index])
        );
      } else {
        const product = {
          name: props.product.name,
          quantity: quantity.value,
          price: props.product.price,
          slug: props.product.slug,
        };
        cartStore.cart.push(product);
        localStorage.setItem(product.name, JSON.stringify(product));
      }
    }

    return {
      changeImage,
      stepUp,
      stepDown,
      quantity,
      addToCart,
    };
  },
};
</script>

<style scoped lang="scss">
.product-container {
  width: 100%;
  .product {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 56px 0 160px;

    .product-info {
      width: 40%;
      .overline {
        margin-bottom: 16px;
      }
      h2 {
        margin-bottom: 32px;
      }
      .description {
        margin-bottom: 32px;
      }
      .price {
        font-weight: 700;
        font-size: 18px;
        line-height: 25px;
        letter-spacing: 1.28571px;
        text-transform: uppercase;
        margin-bottom: 47px;
      }
      .add-to-cart {
        display: flex;
      }
      .input-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 120px;
        padding: 15px 15px;
        height: 48px;
        background: #f1f1f1;
        margin-right: 16px;

        button {
          cursor: pointer;
          border: none;
          background: transparent;
          color: #d87d4a;

          &:hover {
            color: #333;
          }
        }

        input[type="number"] {
          border: none;
          background: transparent;
          width: 50%;
          text-align: center;
          appearance: textfield;
          margin: 0;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      }
    }
    .product-img {
      width: 50%;
      height: 100%;
      border-radius: 8px;
      object-fit: cover;
      object-position: center;
    }
  }
  .product-additional-information {
    width: 100%;
    height: auto;
    margin-bottom: 160px;
    display: flex;
    justify-content: space-between;
    .features {
      width: 57%;
      h3 {
        margin-bottom: 32px;
      }
    }
    .in-the-box {
      width: 30%;
      h3 {
        margin-bottom: 32px;
      }
      .box-item {
        margin-bottom: 8px;
        height: 25px;
        display: flex;
        align-items: center;

        .item-quantity {
          font-weight: 700;
          font-size: 15px;
          line-height: 25px;
          color: #d87d4a;
          margin-right: 24px;
        }
        .item-name {
          font-weight: 500;
          font-size: 15px;
          line-height: 25px;
          color: #000000;
          mix-blend-mode: normal;
          opacity: 0.5;
        }
      }
    }
  }
}

@media (max-width: 800px) {
  .product-container {
    width: 100%;
    height: 100%;
    .product {
      height: 100%;
      margin: 24px 0 120px;
      .product-info {
        width: 50%;
        h2 {
          font-size: 28px;
        }
      }
      .product-img {
        width: 45%;
        height: 480px;
      }
    }
    .product-additional-information {
      flex-direction: column;
       margin-bottom: 120px;
      .features {
        width: 100%;
        margin-bottom: 120px;
      }
      .in-the-box {
        width: 100%;
        display: flex;
        h3{ 
          width: 50%;
        }
        .box-item-container{
          width: 50%;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .product-container {
    .product{
      flex-direction: column;
      .product-info {
        width: 100%;
      }
      .product-img {
        width: 100%;
        margin-bottom: 32px;
      }
    }
    .product-additional-information {
       margin-bottom: 88px;
      .in-the-box {
        width: 100%;
        display: block;
        h3{ 
          width: 100%;
        }
        .box-item-container{
          width: 100%;
        }
      }
    }
  }
}
</style>

<script setup>
import { useCartStore } from "../store/cart";
import { ref, computed } from "vue"
const cartStore = useCartStore();
// function that increase the quantity of a product in the cart, refer to /store/cart.js
function stepUp(name) {
  cartStore.increaseQuantity(name);
}
// function that decrease the quantity of a product in the cart, refer to /store/cart.js
function stepDown(name) {
  cartStore.decreaseQuantity(name);
}

const productPage = computed(() => {
  return cartStore.route.includes("/product/") ? true : false;
});
</script>
<template>
  <aside class="cart" v-if="cartStore.reveal">
    <Teleport to="body">
      <div class="overlay" @click="cartStore.toggleReveal"></div>
    </Teleport>
    <div class="cart-content">
      <div class="title-remove-container">
        <h6>CART ({{ cartStore.cart.length }})</h6>
        <button
          v-if="cartStore.cart.length"
          type="button"
          class="btn-remove"
          @click="cartStore.removeAll"
        >
          Remove all
        </button>
      </div>
      <div v-if="!cartStore.cart.length" class="description">Cart empty</div>
      <div class="cart-item" v-for="cartItem in cartStore.getCart" :key="cartItem">
        <Transition>
          <div class="cart-item-container">
            <div class="cart-item-info">
              <img v-if="productPage" :src="`../assets/cart/image-${cartItem.slug}.jpg`" :alt="`cart image of ${cartItem.slug}`"/>
              <img v-else :src="`assets/cart/image-${cartItem.slug}.jpg`" :alt="`cart image of ${cartItem.slug}`"/>
              <div class="cart-item-info-detail">
                <div class="cart-product-name">{{ cartItem.name }}</div>
                <div class="cart-price">$ {{ cartItem.price }}</div>
              </div>
            </div>
            <div class="input-group">
              <button class="btn-minus" @click="stepDown(cartItem.name)">
                -
              </button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                v-model="cartItem.quantity"
              />
              <button class="btn-plus" @click="stepUp(cartItem.name)">+</button>
            </div>
          </div>
        </Transition>
      </div>
      <div v-if="cartStore.cart.length" class="cart-total">
        <p class="total-text">Total</p>
        <p class="total-price">$ {{ cartStore.getTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p>
      </div>
      <RouterLink
        v-if="cartStore.cart.length"
        to="/checkout"
        class="btn-primary checkout"
        >checkout</RouterLink>
    </div>
  </aside>
</template>
<style scoped lang="scss">
.cart {
  width: 100%;
  height: 100%;

  .cart-content {
    background: #fff;
    max-width: 377px;
    width: 95%;
    border-radius: 8px;
    padding: 30px;
    position: absolute;
    top: 120px;
    right: 25px;
    z-index: 10;

    .title-remove-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;

      .btn-remove {
        display: block;
        border: none;
        background: transparent;
        font-weight: 500;
        font-size: 15px;
        line-height: 25px;
        mix-blend-mode: normal;
        color: #000;
        cursor: pointer;
        opacity: 0.5;

        &:hover {
          color: #d87d4a;
          opacity: 1;
        }
      }
    }

    .cart-item {
      .cart-item-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .cart-item-info {
          width: 100%;
          display: flex;
          align-items: center;
          img {
            width: 64px;
            height: 64px;
            border-radius: 8px;
          }
          .cart-item-info-detail {
            margin-left: 16px;
            .cart-product-name {
              font-weight: 700;
              font-size: 15px;
              line-height: 25px;
            }
            .cart-price {
              font-weight: 700;
              font-size: 14px;
              line-height: 25px;
              color: #000000;
              mix-blend-mode: normal;
              opacity: 0.5;
            }
          }
        }
        .input-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 96px;
          padding: 15px 15px;
          height: 32px;
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
    }

    .cart-item:not(:last-child) {
      margin-bottom: 24px;
    }

    .cart-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      .total-text {
        font-weight: 500;
        font-size: 15px;
        line-height: 25px;
        color: #000000;
        mix-blend-mode: normal;
        text-transform: uppercase;
        opacity: 0.5;
      }
      .total-price {
        font-weight: 700;
        font-size: 18px;
        line-height: 25px;
        text-align: center;
        text-transform: uppercase;
      }
    }

    .btn-primary.checkout {
      display: block;
      width: 100%;
      text-align: center;
    }
  }
}

.v-enter-active {
  transition: all 0.4s ease-out;
}

.v-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 500px) {
  .cart {
    .cart-content {
      right: 8px;
    }
  }
}
</style>

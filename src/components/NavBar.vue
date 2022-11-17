<script setup>
import NavLinks from "./NavLinks.vue";
import NavBarMenu from "./NavBarMenu.vue";
import { useCartStore } from "../store/cart";
import { ref, computed } from "vue";
import { useScreenStore } from "../store/screen";
import { useRoute } from "vue-router";

// get the pinia store to set the screen size 
const screenStore = useScreenStore();
let screenWidth = ref(screenStore.getScreenWidth);

// set the screen size by listening the resize of the page
window.addEventListener("resize", handleScreenListener);

function handleScreenListener() {
  screenStore.setWindowWidth();
  screenWidth.value = screenStore.getScreenWidth;
  if (screenWidth.value > 800) {
    menuReveal.value = false;
  }
}
const cartStore = useCartStore();
const menuReveal = ref(false);
// function that display the menu 
function toggleMenu() {
  menuReveal.value = !menuReveal.value;
}

const route = useRoute();
let baseUrl = "";
if(route.fullPath.includes("/product/")){
  baseUrl = "../";
}

function toggleCart(){
  cartStore.toggleReveal();
  cartStore.route = route.fullPath;
  console.log(cartStore.route);
}
</script>
<template>
  <nav>
    <button
      type="button"
      aria-label="toggle curtain navigation"
      class="nav-toggler"
      @click="toggleMenu"
    >
      <span class="line l1"></span>
      <span class="line l2"></span>
      <span class="line l3"></span>
    </button>
    <RouterLink to="/" aria-label="nav-logo"
      ><img
        src="/assets/shared/desktop/logo.svg"
        alt="audiophile"
        class="nav-logo"
      />
    </RouterLink>
    <div class="nav-bar">
      <NavLinks></NavLinks>
    </div>
    <button type="button" class="btn-cart" @click="toggleCart" aria-label="btn-cart">
      <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z"
          fill="#FFF"
          fill-rule="nonzero"
        />
      </svg>
    </button>
    <Transition name="slide">
      <div v-if="menuReveal" class="menu-container">
        <Teleport to="body">
          <div class="overlay" @click="toggleMenu()"></div>
        </Teleport>
        <NavBarMenu :toggleMenu="toggleMenu"></NavBarMenu>
      </div>
    </Transition>
  </nav>
</template>
<style lang="scss">
nav {
  width: 100%;
  max-width: 1150px;
  height: 97px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;

  .nav-toggler {
    position: relative;
    width: 16px;
    height: 15px;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    margin-left: 25px;
    display: none;
  }

  .nav-toggler .line {
    position: absolute;
    display: block;
    width: 100%;
    height: 3px;
    background: #fff;
    transition: transform 0.3s ease-out, opacity 0.1s ease-out;
  }

  .l1 {
    transform: translateY(-6px);
  }

  .l3 {
    transform: translateY(+6px);
  }

  a {
    display: flex;
    align-items: center;
  }

  .nav-logo {
    width: 143px;
    height: 25px;
    margin-left: 25px;
  }

  .nav-bar {
    width: 55%;
    display: flex;
  }

  .btn-cart {
    border: none;
    background: transparent;
    margin-right: 25px;
    cursor: pointer;

    svg {
      width: 24px;
      height: 20px;
      display: inline-block;

      &:hover path {
        fill: #d87d4a;
      }
    }
  }
  .menu-container {
    width: 100%;
    background: #fff;
    position: absolute;
    padding: 60px 30px 40px;
    top: 96px;
    left: 0;
  }
}

.slide-enter-active {
  transition: all 0.4s ease-out;
}

.slide-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 800px) {
  nav {
    justify-content: flex-start;
    .nav-toggler {
      display: block;
    }

    .btn-cart {
      margin-left: auto;
    }

    .nav-bar {
      display: none;
    }
  }
}

@media (max-width: 500px) {
  nav {
    justify-content: space-between;

    .nav-logo {
      margin-left: 0px;
    }

    .btn-cart {
      margin-left: 0;
    }
  }
}
</style>

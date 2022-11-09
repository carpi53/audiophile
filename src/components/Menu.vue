<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="menu">
    <div class="menu-category">
      <div class="category-img-container">
        <img
          src="@/assets/shared/desktop/image-category-thumbnail-headphones.png"
          alt="category headphones"
          class="category-img"
        />
      </div>
      <div class="category-info">
        <h5>headphones</h5>
        <div class="link-container">
          <RouterLink to="/headphones">Shop</RouterLink>
          <img
            src="@/assets/shared/desktop/icon-arrow-right.svg"
            alt="arrow right"
          />
        </div>
      </div>
    </div>
    <div class="menu-category">
      <div class="category-img-container">
        <img
          src="@/assets/shared/desktop/image-category-thumbnail-speakers.png"
          alt="category speakers"
          class="category-img"
        />
      </div>
      <div class="category-info">
        <h5>speakers</h5>
        <div class="link-container">
          <RouterLink to="/speakers">Shop</RouterLink>
          <img
            src="@/assets/shared/desktop/icon-arrow-right.svg"
            alt="arrow right"
          />
        </div>
      </div>
    </div>
    <div class="menu-category">
      <div class="category-img-container">
        <img
          src="@/assets/shared/desktop/image-category-thumbnail-earphones.png"
          alt="category earphones"
          class="category-img"
        />
      </div>
      <div class="category-info">
        <h5>earphones</h5>
        <div class="link-container">
          <RouterLink to="/earphones">Shop</RouterLink>
          <img
            src="@/assets/shared/desktop/icon-arrow-right.svg"
            alt="arrow right"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  width: 100%;
  display: flex;
  .menu-category {
    width: 33%;
    height: auto;
    background: #f1f1f1;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;

    .category-img-container {
      width: 100%;
      height: 55%;
      .category-img {
        margin-top: -15%;
        width: 58%;
        height: auto;
      }
      .category-img:last-child {
        width: 70%;
      }
    }
    .category-info {
      width: 100%;
      height: 45%;
      h5 {
        margin-top: 10px;
        margin-bottom: 7%;
      }

      .link-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        a {
          text-decoration: none;
          font-weight: 700;
          font-size: 13px;
          line-height: 18px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #000000;
          mix-blend-mode: normal;
          opacity: 0.5;

          &:hover {
            opacity: 1;
            color: #d87d4a;
          }
        }
        img {
          margin-left: 14px;
        }
      }
    }
  }
  .menu-category:not(:last-child) {
    margin-right: clamp(10px, 3vw, 30px);
  }
}

@media (max-width: 800px) {
  .menu {
    .category-img-container {
      height: 75%;
    }
    .category-info {
      height: 25%;
      margin-top: -5%;
    }
  }
}

@media (max-width: 600px) {
  .menu {
    .category-info {
      margin-top: -10%;
    }
  }
}

@media (max-width: 500px) {
  .menu {
    flex-direction: column;
    margin-top: 30px;
    .menu-category {
      width: 100%;
      .category-img-container {
        height: 40%;
        .category-img {
          width: 35%;
          height: auto;
        }
        .category-img:last-child {
          width: 50%;
        }
      }
    }
    .menu-category:not(:last-child){
      margin-bottom: 90px;
    }
  }
}
</style>

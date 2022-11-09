<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <RouterLink to="/">home</RouterLink>
  <RouterLink to="/headphones">headphones</RouterLink>
  <RouterLink to="/speakers">speakers</RouterLink>
  <RouterLink to="/earphones">earphones</RouterLink>
</template>

<style scoped lang="scss">
a {
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 13px;
  line-height: 25px;
  letter-spacing: 2px;
  text-transform: uppercase;

  &:hover {
    color: #d87d4a;
  }

  .router-link-exact-active {
    color: #d87d4a;
  }
}

a:not(:last-child) {
  margin-right: 34px;
}

@media (max-width: 500px) {
  a:not(:last-child) {
    margin-right: 0px;
    margin-bottom: 16px;
  }
}
</style>

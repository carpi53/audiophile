<script setup>
defineProps({
  category: String,
});
</script>
<template>
  <section class="category-header">
    <div class="category-header-container">
      <hr />
      <div class="title-container">
        <h2>{{ category }}</h2>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.category-header {
  width: 100%;
  height: 239px;
  background: #000;

  .category-header-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 25px;

    hr {
      width: 100%;
      max-width: 1110px;
      height: 1px;
      background-color: #f1f1f1;
      opacity: 0.75;
    }
    .title-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      h2 {
        color: #fff;
      }
    }
  }
}

@media (max-width: 500px) {
  .category-header {
    height: 120px;
    .category-header-container {
      padding: 0;
    }
  }
}
</style>

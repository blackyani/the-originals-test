<script setup lang="ts">
  import '~/assets/css/index.css'
</script>

<template>
  <div class="app-wrapper">
    <AppHeader />
    <Board />
  </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  background-image: url("~/assets/images/background.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
}
</style>

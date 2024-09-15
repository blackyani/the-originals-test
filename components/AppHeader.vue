<script setup lang="ts">
  import StarOutline from "vue-material-design-icons/StarOutline.vue";
  import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
  import LockOutline from "vue-material-design-icons/LockOutline.vue";
</script>

<template>
  <div class="header-wrapper">
    <h2 class="header-wrapper-text">Example</h2>
    <StarOutline class="header-wrapper-icon" />
    <h3 class="header-wrapper-text">
      <LockOutline class="header-wrapper-icon" />
      Private
    </h3>
    <button class="header-wrapper-button">
      Board
    </button>
    <ChevronDown class="header-wrapper-menu" />
  </div>
</template>

<style scoped lang="scss">
.header-wrapper {
  padding: 12px 10px 12px 16px;
  backdrop-filter: blur(4px);
  background: var(--header-color);
  display: flex;
  align-items: center;

  &-icon {
    margin: 0 8px;
  }
  &-text {
    display: flex;
    align-items: center;
    color: var(--dynamic-text);
    margin-right: 10px;
  }
  &-button {
    padding: 0 12px;
    border-radius: 4px;
    margin: 0 8px;
    background-color: var(--dynamic-button-highlighted);
    color: var(--dynamic-button-highlighted-text);
    height: 32px;
    border: none;
  }
  &-menu {
    display: flex;
  }
}
</style>

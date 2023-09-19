
<template>
  <div class="captionBar">
    <div class="logo"><slot name="logo"></slot></div>
    <div class="main"><slot name="main"></slot></div>
    <div class="widget"><slot name="widget"></slot></div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.captionBar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    justify-content: left;
    flex: 1;
  }

  .main {
    display: flex;
    justify-content: center;
    flex: 1;
  }

  .widget {
    display: flex;
    justify-content: right;
    flex: 1;
    // gap: 10px;
    margin-right: 4px;
  }
}
</style>

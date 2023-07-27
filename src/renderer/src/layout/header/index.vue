
<template>
  <div class="header">

    <div class="logo">
      <img src="~@renderer/assets/logo.png" alt="">
    </div>
    <div class="bar">
      <div>动态壁纸</div>
      <div>静态壁纸</div>
      <div>我的</div>
    </div>
    <div class="diy">2</div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

.header {
  --logo-width: 170px;

  width: 100%;
  height: var(--header-height);
  // box-shadow: 0px 1px 5px rgba(0, 0, 0, .3);
  position: relative;
  user-select: none;

  .logo {
    width: var(--logo-width);
    height: 100%;
    filter: drop-shadow(0 0 1px black);
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;

    img {
      height: 200%;
      object-fit: contain;
      transform: translateX(-5%) translateY(-25%);
    }
  }

  .bar {
    position: absolute;
    top: 0;
    left: var(--logo-width);
    width: calc(100% - var(--logo-width) - 20%);
    height: 100%;

    display: flex;
    justify-content: left;
    align-items: center;

    div {
      margin-left: 20px;
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
      border-radius: 18px;
      cursor: pointer;

      background-color: green;
      position: relative;

      &::before, &::after {
        content: '';
        position: absolute;
      }

      &::before {
        bottom: 0;
        left: 0;
        width: 50%;
        height: 50%;
        background-color: blue;
      }

      &::after {
        top: 0;
        right: 0;
      }
    }
  }

  .diy {
    position: absolute;
    right: 0;
    top: 0;
    width: 20%;
    height: 100%;
  }
}

</style>


<template>
  <div id="frame_app"><RouterView /></div>
</template>

<style lang="scss" scoped>
@import "../../styles/var.scss";
@import "../../styles/mixin.scss";

#frame_app {
  width: 100vw;
  height: 100vh;
  background-color: var(--s-main-frame-background-color);
  border-radius: $sMainFrameContainerRadius;
  box-shadow: 8px 8px 10px grey;

  @include overflow(hidden);
}
</style>

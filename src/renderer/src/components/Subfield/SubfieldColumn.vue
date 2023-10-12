<template>
  <div class="subfield-cloumn">
    <div v-if="$slots.top" class="top"><slot name="top"></slot></div>
    <div v-if="$slots.middle" class="middle"><slot name="middle"></slot></div>
    <div v-if="$slots.bottom" class="bottom"><slot name="bottom"></slot></div>
  </div>
</template>

<style lang="scss" scoped>

.subfield-cloumn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }

  .middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
}

</style>

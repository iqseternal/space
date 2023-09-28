<template>
  <div class="list" ref="listRef">
    <template v-for="item in list" :key="item.t">

    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch } from 'vue';

import { useDebounce } from '@renderer/hooks/useDebounce';

import Card from './Card.vue';
import { list as listData } from './data';

const list = ref<Source[]>(listData);
const listRef = ref() as Ref<HTMLDivElement>;
const isLoad = ref(false);

const downloadWallpaperF = (source: Source) => {

}

const contextmenu = (e) => {
  console.log('cardlist, card, contextmenu', e);
}


watch(() => isLoad.value, (nv) => {
  if (nv) {

  }

});

onMounted(() => {
  listRef.value.onscroll = useDebounce(() => {
    if (listRef.value.scrollHeight - listRef.value.scrollTop - listRef.value.clientHeight < 5 && !isLoad.value) isLoad.value = true;
  }, 100);
});
</script>

<style lang="scss" scoped>
@import "../../styles/mixin.scss";

.list {
  flex-wrap: wrap;
  @include displayFlex;
  @include overflow;
  @include beautifulBar;

  .card {
    @include width(32%, 300px, 800px);

    aspect-ratio: 16 / 9;

    margin: 20px 10px 0 10px;

    filter: contrast(1.3);

    box-shadow: 0px 0px 2px 1px gray;
  }
}

</style>

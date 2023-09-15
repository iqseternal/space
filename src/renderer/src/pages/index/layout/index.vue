
<template>
  <RMacDocker :auto-hidden="false" :driver-max-i="1.5" :driver-effect-width="300">
    <template #main><RouterView /></template>

    <template #default>
      <template v-for="(item, index) in list" :key="index"><RMacDockerItem :src="item" /></template>
    </template>

    <template #control>
      <RMacDockerItem src="https://tse2-mm.cn.bing.net/th/id/OIP-C.bkdDrOZ9W9bnZH62pIiZqgAAAA?w=150&h=150&c=7&r=0&o=5&pid=1.7" />
    </template>
  </RMacDocker>
</template>

<script lang="ts" setup>
import { h, onMounted } from 'vue';
import { RMacDocker, RMacDockerItem, rSetMacDockerCssVars } from '@suey/rocketry';

onMounted(() => rSetMacDockerCssVars({
  '--r-mac-docker-item-size': '30px',
  '--r-mac-docker-item-margin': '20px',
  '--r-mac-docker-bottom': '20px',
  '--r-mac-docker-box-reflect-distance': '5px',
  '--r-mac-docker-bg-blur': '28px',
  '--r-mac-docker-margin-bottom': '10px',
  '--r-mac-docker-bg': 'rgba(215, 215, 215, 1)',
  '--r-mac-docker-radius': '10px'
}));

const list = [
  "https://tse4-mm.cn.bing.net/th/id/OIP-C.wPY2_PJMnXtLAUKPUAlwlAAAAA?w=152&h=140&c=7&r=0&o=5&pid=1.7",
  "https://tse3-mm.cn.bing.net/th/id/OIP-C.Xhuf16W9uzvkQPj6NhDDRAAAAA?w=130&h=130&c=7&r=0&o=5&pid=1.7",
  "https://tse1-mm.cn.bing.net/th/id/OIP-C.hlviKjBLfMuQ9Fr7J2cWzwAAAA?w=140&h=150&c=7&r=0&o=5&pid=1.7",
  "https://tse2-mm.cn.bing.net/th/id/OIP-C.HVYqci_hok3widKduq_EawAAAA?w=141&h=150&c=7&r=0&o=5&pid=1.7",
  "https://tse3-mm.cn.bing.net/th/id/OIP-C.HKngSDiahYfSyociRrS4KwAAAA?w=143&h=150&c=7&r=0&o=5&pid=1.7"
];
</script>

<style lang="scss" scoped>

</style>

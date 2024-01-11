<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { useErrorCaptured } from '@renderer/hooks';

useErrorCaptured();
</script>

<template>
  <ACard>
    <template v-if="CURRENT_PLATFORM === PLATFORMS.WINDOWS">
      1
    </template>
  </ACard>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTableAttrs, useColumns } from '@renderer/hooks';
import type { Response } from './api';
import { getListApi } from './api';
import { PLATFORMS } from 'target.config';
import Subfield from '@components/Subfield';
import NewLi from './NewLi.vue';


</script>

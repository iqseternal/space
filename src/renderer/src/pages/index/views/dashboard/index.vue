<template>
  <ACard/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTableAttrs, useColumns } from '@renderer/hooks';
import type { Response } from './api';
import { getListApi } from './api';
import Subfield from '@components/Subfield';
import NewLi from './NewLi.vue';


</script>

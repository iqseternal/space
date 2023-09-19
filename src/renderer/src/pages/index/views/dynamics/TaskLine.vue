
<template>
  <div class="taskLine">



    <Timeline>
      <template v-for="(li, index) in list" :key="index">
        <TimelineItem>
          <template v-if="li.dot" #dot><component :is="components[li.dot]" /></template>
          {{ li.text }}
        </TimelineItem>
      </template>
    </Timeline>
  </div>
</template>

<script lang="ts" setup>
import { Card, Timeline, TimelineItem } from 'ant-design-vue';
import { ClockCircleOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

const components = { ClockCircleOutlined }
const list = [
  {
    dot: 'ClockCircleOutlined',
    text: 'Technical testing 2015-09-01'
  },
  {
    dot: null,
    text: 'Technical testing 2015-09-01'
  },
  {
    dot: null,
    text: 'Technical testing 2015-09-01'
  }
]

</script>

<style lang="scss" scoped>

.taskLine {

  width: 100%;
  height: 100%;


  padding-top: 100px;

}


</style>

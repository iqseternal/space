<template>
  <div class="dynamics">
    <YearSelector class="yearSelector" />
    <Card class="card">
      <Calendar v-model:value="value" :fullscreen="false">

      </Calendar>
    </Card>

    <div class="task">
      <TaskLine />
    </div>
  </div>
  <div class="dynamics">
    <YearSelector class="yearSelector" />
    <Card class="card">
      <Calendar v-model:value="value" :fullscreen="false">

      </Calendar>
    </Card>

    <div class="task">
      <TaskLine />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Dayjs } from 'dayjs';
import { Calendar, Card, Badge, Tag, Space, Avatar } from 'ant-design-vue';

import YearSelector from './YearSelector.vue';
import TaskLine from './TaskLine.vue';

const value = ref<Dayjs>();
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.dynamics {
  display: flex;
  justify-content: space-between;
  // align-items: flex-start;
  align-items: center;
  // background-color: red;
  width: 100%;
  height: 80%;
  // min-width: 1200px;
  min-height: 600px;

  .yearSelector {
    @media (max-width: 1200px) {
      display: none !important;
    }
  }

  .card {
    @media (max-width: 1200px) { width: 68%; }
    width: calc((100% - 50%) + 100px);
    height: 100%;
    background-color: unset;
    border: unset;

    &:deep(.ant-picker-calendar.ant-picker-calendar-full.css-dev-only-do-not-override-kqecok), &:deep(.ant-picker-panel), &:deep(.ant-picker-calendar) {
      background-color: unset;
      user-select: none;
    }
    &:deep(.ant-select-selector), &:deep(.ant-radio-button-wrapper) {
      background-color: unset;
      border: unset;
    }

    &:deep(.ant-picker-cell) {
      &:hover {
        div.ant-picker-cell-inner.ant-picker-calendar-date {
          background-color: unset !important;
        }
      }

      div.ant-picker-cell-inner.ant-picker-calendar-date {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: unset !important;
        max-width: unset !important;
        // height: 70px;
        position: relative;
        background-color: unset;

        @media (max-height: 1080px) { height: 100px !important; }
        @media (max-height: 950px) { height: 90px !important; }
        @media (max-height: 900px) { height: 80px !important; }
        @media (max-height: 850px) { height: 75px !important; }

        &::before {
          content: '';
          width: 50px;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          z-index: -1;
          @include positionLt(absolute, 50%, 50%);
          transform: translateX(-50%) translateY(-50%);
        }
      }
    }
    &:deep(.ant-picker-cell.ant-picker-cell-in-view.ant-picker-cell-selected) {
      div.ant-picker-cell-inner.ant-picker-calendar-date {
        &::before {
          background-color: #3ae49b !important;
        }
      }
    }

    &:deep(.ant-radio-button-wrapper-checked) {
      background-color: blue;
      border-radius: 10px;
      color: white;
    }
  }

  .task {
    width: 30%;
    height: 100%;
  }
}

.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  // width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}

</style>

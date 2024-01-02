<template>
  <ATabs class="graphics h-full">
    <ATabPane :key="1" tab="系统图形"><SystemGraphics /></ATabPane>
    <ATabPane :key="2" tab="我的图形"><CustomGraphics /></ATabPane>
  </ATabs>
</template>

<script lang="ts" setup>
import SystemGraphics from './SystemGraphics.vue';
import CustomGraphics from './CustomGraphics.vue';

</script>

<style lang="scss" scoped>
@import '@scss/mixin.scss';
@import '@scss/var.scss';

.graphics {
  width: 300px;
  height: 100%;
  background-color: var(--s-main-frame-bg-darkness-color);
  @include beautifulBar;

  &:deep(div.ant-tabs-nav) {
    background-color: var(--s-main-frame-bg-normal-color);
    margin-bottom: unset;

    div.ant-tabs-nav-wrap {
      display: unset;

      div.ant-tabs-nav-list {
        justify-content: space-around;

        div.ant-tabs-tab {
          padding: 8px 10px;
          font-size: 12px;
          margin: 0;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import '@scss/mixin.scss';
@import '@scss/var.scss';

div.ant-tabs.graphics div.ant-collapse {
  border-radius: unset;
  border: unset;

  div.ant-collapse-item {

    div.ant-collapse-header {
      font-size: 12px;
      background: var(--s-main-frame-bg-normal-color);
      padding: 8px 16px;
    }

    div.ant-collapse-content .ant-collapse-content-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 12px;
      padding: 10px 10px;

      div.graphic {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 52px;
        position: relative;
        padding: 10px 0;
        border-radius: 2px;
        border: 1px solid transparent;

        &:hover {
          cursor: pointer;
          border-color: var(--color-primary);
        }
        p {
          margin-top: 6px;
          padding: 0 8px;
          text-align: center;
          font-size: 12px;
          height: 12px;
          line-height: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          word-break: break-all;
          -webkit-box-orient: vertical;
        }

        svg {
          color: var(--color);
          width: 28px;
          height: 28px;
          /* width: 100%; */
          margin: auto;
        }
      }
    }
  }
}
</style>

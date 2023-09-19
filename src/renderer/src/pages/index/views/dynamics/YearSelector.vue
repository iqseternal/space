<template>
  <div class="selector">

    <div class="yearContainer">
      <div class="add" @click="increaseYear(1)"></div>
      <div class="content">{{ year }}</div>
      <div class="sub" @click="increaseYear(-1)"></div>
    </div>

    <div class="disc">
      <div class="innerCircle" ref="circle" @mousedown="keyDown" @mouseup="keyUp" @mousemove="selectIt">
        <template v-for="(monthItem, index) in months" :key="monthItem.value">
          <div class="discItem" :style="{ '--i': index, '--d': (360 / months.length) + 'deg'}" @click="moveTo(index, (360 / months.length))">{{ monthItem.title }}</div>
        </template>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch, onUnmounted } from 'vue';
import { message } from 'ant-design-vue';

const months = ref([
 { title: '一 月', value: 1 },
 { title: '二 月', value: 2 },
 { title: '三 月', value: 3 },
 { title: '四 月', value: 4 },
 { title: '五 月', value: 5 },
 { title: '六 月', value: 6 },
 { title: '七 月', value: 7 },
 { title: '八 月', value: 8 },
 { title: '九 月', value: 9 },
 { title: '十 月', value: 10 },
 { title: '十一月', value: 11 },
 { title: '十二月', value: 12 }
]);

const year = ref(1);
const month = ref(months[5]);

const increaseYear = (idx: number) => {
  const nYear = year.value + idx;

  if (nYear <= 0) {
    message.error('时间不能为负数', 1);

    return;
  }

  year.value = nYear;
}

const circle = ref() as Ref<HTMLElement>;
const deg = ref(0);
onMounted(() => {
  watch(() => deg.value, nDeg => circle.value.style.transform = `translateX(-50%) translateY(-50%) rotate(${nDeg}deg)`);
});

const moveTo = (idx: number, d: number) => { // idx 第几个, d 间隔角
  deg.value = (Math.abs(deg.value) % 360 * (deg.value > 0 ? 1 : -1) + -idx * d);
}

function selectIt(e: MouseEvent) {

}

function keyDown() {

}

function keyUp() {

}

</script>

<style lang="scss" scoped>
@import "../../../../styles/mixin.scss";

.selector {
  --back-bg: #b4cbf5bd;

  width: 200px;
  aspect-ratio: 1 / 2;
  flex-direction: column;
  border-radius: 0 200px 200px 0;
  background-color: var(--back-bg);
  color: var(--s-main-frame-active-contain-color);
  position: relative;
  user-select: none;
  @include displayFlex(center, flex-start);
  @include overflow(hidden);

  .yearContainer {
    position: relative;
    margin-left: 20px;
    z-index: 99999;

    .content {
      width: 5rem;
      height: 2rem;
      background-color: rgba(0, 0, 0, .1);
      font-size: 30px;
      @include displayFlex(center, center);
      @include overflow(hidden);
    }

    .add {
      width: 20px;
      height: 10px;
      background-color: white;
      clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
      cursor: pointer;
      transform: translateX(-50%);
      @include positionLt(absolute, -20px, 50%);
    }

    .sub {
      width: 20px;
      height: 10px;
      background-color: white;
      clip-path: polygon(0% 0, 50% 100%, 100% 0%);
      cursor: pointer;
      transform: translateX(50%);
      @include positionRb(absolute, -20px, 50%);
    }
  }

  .disc {
    width: 200%;
    height: 100%;
    @include positionLt(absolute, 0, -100%);

    .innerCircle {
      cursor: pointer;
      width: 80%;
      height: 80%;
      transform: translateX(-50%) translateY(-50%) rotate(0deg);
      transform-origin: center center;
      transition: all .7s ease-out;

      border-radius: 50%;
      border: 1px solid white;
      @include positionLt(absolute, 50%, 50%);

      .discItem {
        width: 3rem;
        text-align: center;
        transform: translateX(-50%) translateY(-50%) rotateZ(calc(var(--d) * var(--i))) translateX(335%);
        color: white;
        background-color: var(--back-bg);

        @include positionLt(absolute, 50%, 50%);
      }
    }
  }
}


</style>

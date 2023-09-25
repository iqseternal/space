<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    src: { type: String, required: false }
  },
  setup(props, { slots }) {
    return () => (
      <div class="sidebarItem">
        <div class="itemContainer">
          { slots.default ? slots.default() : (<img src={props.src} alt="" />) }
        </div>
      </div>
    )
  }
})

</script>

<style lang="scss" scoped>

.sidebarItem {
  --size: calc(var(--s-main-frame-sidebar-width) - 20px);
  position: relative;

  width: var(--size);
  height: var(--size);

  // background-color: chartreuse;
  // border-top-left-radius: 10px;
  // border-bottom-left-radius: 10px;

  // border-radius: 10px 0 0 10px;
  // background-color: red;

  .itemContainer {
    width: calc(var(--size) - 12px);
    height: calc(var(--size) - 12px);
    position: absolute;
    top: 6px;
    left: 6px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>

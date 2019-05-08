<style lang="scss" scoped>
.i-component-container {
  &:hover {
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0 1px #08ce96;

    .i-component-container-operation {
      display: block;
    }
  }

  &-operation {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: none;
    background-color: #08ce96;
    padding: 2px 4px;
  }

  &-moveup,
  &-movedown,
  &-remove {
    display: inline-block;
    color: #fff;
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    opacity: 0.5;
    transition: 0.3s opacity ease;

    &::before {
      display: inline-block;
    }

    &:hover {
      opacity: 1;
    }
  }

  &-movedown {
    margin-left: 0.5em;
  }
}
</style>


<template>
  <div class="i-component-container">
    <div class="i-component-container-operation">
      <a
        href="javascript:;"
        class="i-component-container-moveup el-icon-sort-up"
        title="上移"
        @click="handleMove('up')"
      ></a>
      <a
        href="javascript:;"
        class="i-component-container-movedown el-icon-sort-down"
        title="下移"
        @click="handleMove('down')"
      ></a>
      <a
        href="javascript:;"
        class="i-component-container-remove el-icon-delete"
        title="删除"
        @click="handleRemove"
      ></a>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import randomStr from "../../utils/random_str.js";

export default {
  props: {
    id: {
      type: String,
      default: randomStr()
    }
  },
  data() {
    return {};
  },
  methods: {
    handleMove(direction) {
      this.$bus.emit("moveComponentById", this.id, direction);
    },
    handleRemove(ev) {
      this.$bus.emit("removeComponentById", this.id);
    }
  }
};
</script>

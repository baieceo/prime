<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./assets/fonts/iconfont.css";

html,
body,
ul,
li {
  margin: 0;
  padding: 0;
}

ul,
li {
  list-style: none;
}

%scroll {
  /* 针对缺省样式 (必须的) */
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
  }

  /* 滚动条的滑轨背景颜色 */
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 5px;
  }

  /* 滑块颜色 */
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 2px;
  }

  /*内层轨道的颜色*/
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 2px;
  }

  /* 滑轨两头的监听按钮颜色 */
  &::-webkit-scrollbar-button {
    background-color: transparent;
    width: 0;
    height: 0;
  }

  /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  [class*=" el-icon-prime"],
  [class^="el-icon-prime"] {
    font-family: iconfont !important;
  }
}
</style>

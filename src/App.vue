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

<style lang="scss" scoped>
%clearfix {
  zoom: 1;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
}

html,
body,
img,
p,
ul,
li {
  margin: 0;
  padding: 0;
}

ul,
li {
  list-style: none;
}

img {
  border: none;
}

.loading {
  width: 80px;
  height: 40px;

  span {
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background: #7ebcbb;
    -webkit-animation: load 1s ease infinite;
    margin-left: 2px;
    margin-right: 2px;

    &:nth-child(2) {
      -webkit-animation-delay: 0.2s;
    }
    &:nth-child(3) {
      -webkit-animation-delay: 0.4s;
    }
    &:nth-child(4) {
      -webkit-animation-delay: 0.6s;
    }
    &:nth-child(5) {
      -webkit-animation-delay: 0.8s;
    }
  }
}

@-webkit-keyframes load {
  0%,
  100% {
    height: 40px;
    background: #7ebcbb;
  }

  50% {
    height: 70px;
    margin-top: -15px;
    margin-bottom: -15px;
    background: #2a4f95;
  }
}

.splash {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.products-header {
  background-color: #f5f5f5;
  border: 1px solid #f0f0f0;
  padding: 10px 10px;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.list {
  @extend %clearfix;
}

.item {
  width: 100%;
  float: left;
  margin-bottom: 10px;
  padding: 10px 10px 0;
  border: 1px solid transparent;

  &:hover {
    cursor: pointer;
    border-color: #f0f0f0;
  }
}

.item-img {
  width: 100%;
  height: 190px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  display: block;
  margin-bottom: 10px;
}

.item-title {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  height: 3em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 10px;
}

.item-price {
  display: block;
  margin-right: 10px;
  margin-bottom: 10px;
  color: #e4393c;
  font-size: 20px;
  font-weight: 400;
  font-family: Verdana;

  i {
    font-style: normal;
  }

  em {
    font-size: 16px;
    font-style: normal;
  }
}
</style>

<template>
  <div class="ui">
    <div
      class="splash"
      v-if="props.type === 'init'"
    >
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div
      class="products"
      v-if="props.type === 'loadDataFinish'"
    >
      <el-row
        class="products-header"
        :gutter="20"
      >
        <el-col>最新商品</el-col>
      </el-row>
      <el-row
        class="list"
        :gutter="20"
      >
        <el-col
          :xs="8"
          :sm="6"
          :md="4"
          :lg="3"
          :xl="1"
          class="item"
          v-for="(item, index) of props.data"
          :key="index"
          @click="handleItemClick(item)"
        >
          <span
            class="item-img"
            :style="{ 'background-image': 'url(' + item.img + ')' }"
          ></span>
          <strong class="item-price"><em>¥</em><i>{{ item.price }}</i></strong>
          <p class="item-title">{{ item.title }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ui-component",
  props: {
    props: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    // console.log(this.props);
  },
  methods: {
    handleItemClick(item) {
      this.$emit("action", {
        type: "viewItemDetail",
        data: item
      });
    }
  }
};
</script>

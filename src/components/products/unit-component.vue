<template>
  <div class="unit-component">
    <component
      :is="uiComponentName"
      :style="uiComponentStyle"
      :props="resultData"
      @action="userOperationCallback"
    ></component>
    <component
      :is="interactiveComponentName"
      :props="metaData"
      :payload="payloadData"
      @init="initCallback"
      @finish="userOperationActionCallback"
    ></component>
  </div>
</template>

<script>
import UiComponent from "./ui-component.vue";
import InteractiveComponent from "./interactive-component.vue";

export default {
  data() {
    return {
      uiComponentName: "ui-component",
      interactiveComponentName: "interactive-component",

      // 组件样式
      uiComponentStyle: {
        margin: "20px 20px"
      },
      // 用于显示的结果数据
      resultData: {
        type: "",
        data: null
      },
      // 元数据
      metaData: {
        name: "交互组件"
      },
      // 数据载体
      payloadData: {}
      /*
      '元数据',
            '结果数据',
            '数据载体'
            */
    };
  },
  components: {
    UiComponent,
    InteractiveComponent
  },
  methods: {
    getProps() {
      return [
        {
          label: "格式",
          key: "format",
          value: [
            {
              label: "尺寸",
              key: "size",
              type: "input",
              desc: "描述",
              value: ""
            },
            {
              label: "尺寸",
              key: "size",
              type: "input",
              desc: "描述",
              value: ""
            }
          ]
        },
        {
          label: "格式",
          key: "format2",
          value: [
            {
              label: "尺寸",
              key: "size",
              type: "input",
              desc: "描述",
              value: ""
            }
          ]
        }
      ];
    },
    // 用户操作回调函数
    userOperationCallback(payload) {
      if (payload.type === "viewItemDetail") {
        window.alert(JSON.stringify(payload.data));
      }
    },
    // 初始化完成回调函数
    initCallback(payload) {
      if (payload.type === "init") {
        // 用户结果数据
        this.resultData = Object.assign({}, this.resultData, payload);
      }
    },
    // 用户操作回调响应函数
    userOperationActionCallback(payload) {
      if (payload.type === "loadDataFinish") {
        // 用户结果数据
        this.resultData = Object.assign({}, this.resultData, payload);
      }
    }
  }
};
</script>

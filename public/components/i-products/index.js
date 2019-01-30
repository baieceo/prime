(function () {
  const html = `
    <div class="unit-component">
      <component
        :is="uiComponentName"
        :style="uiComponentStyle"
        :props="resultData"
        @action="userOperationCallback"
      ></component>
      <component
        :is="logicComponentName"
        :props="metaData"
        :payload="payloadData"
        @init="initCallback"
        @finish="userOperationActionCallback"
      ></component>
    </div>
  `

  utils
    .loadFiles([
      './components/i-products/ui.js',
      './components/i-products/logic.js'
    ])
    .then(res => {
      Vue.component('i-products', {
        template: html,
        data () {
          return {
            uiComponentName: 'i-products-ui',
            logicComponentName: 'i-products-logic',

            // 组件样式
            uiComponentStyle: {
              margin: '20px 20px'
            },
            // 用于显示的结果数据
            resultData: {
              type: '',
              data: null
            },
            // 元数据
            metaData: {
              name: '交互组件'
            },
            // 数据载体
            payloadData: {}
          }
        },
        methods: {
          // 用户操作回调函数
          userOperationCallback (payload) {
            if (payload.type === 'viewItemDetail') {
              this.resultData.data.dialogVisible = true
              this.resultData.data.detailData = payload.data
            }
          },
          // 初始化完成回调函数
          initCallback (payload) {
            if (payload.type === 'init') {
              // 用户结果数据
              this.resultData = Object.assign({}, this.resultData, payload)
            }
          },
          // 用户操作回调响应函数
          userOperationActionCallback (payload) {
            if (payload.type === 'loadDataFinish') {
              // 用户结果数据
              this.resultData = Object.assign({}, this.resultData, payload)
            }
          }
        }
      })
    })
})()

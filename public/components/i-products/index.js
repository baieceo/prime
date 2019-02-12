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
        :props="props"
        :payload="payloadData"
        @init="initCallback"
        @action="userOperationCallback"
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
            // 数据载体
            payloadData: {},

            id: 'truck/prodcuts1',
            type: 'truck/product',
            label: '商品列表',
            version: '0.1.0',
            visible: true,
            // 样式配置，提供给控制面板及 ui 组件
            style: {
              margin: '20px 20px'
            },
            // 属性配置（必须），提供控制面板及组件内部使用
            props: {
              api: {
                type: 'String',
                default:
                  'https://www.easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api/tvs#!method=get',
                editor: {
                  label: '商品接口', // 属性标签
                  type: 'input', // 属性输入类型
                  // 属性说明
                  desc:
                    '商品列表请求接口<p>测试连接1：https://www.easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api/tvs#!method=get&t=1</p><p>测试连接2：https://www.easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api/tvs#!method=get&t=2<p>',
                  default:
                    'https://www.easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api/tvs#!method=get' // 属性默认值
                },
                value: '' // 属性值
              }
            },
            // 动画
            animate: []
          }
        },
        /*
        watch: {
          props: {
            handler (newVal, oldVal) {
              console.log('product.index', newVal, oldVal)
            },
            deep: true
          }
        },
        */
        methods: {
          // 用户操作回调函数
          userOperationCallback (payload) {
            if (payload.type === 'viewItemDetail') {
              this.resultData.data.dialogVisible = true
              this.resultData.data.detailData = payload.data
            }

            if (payload.type === 'error') {
              this.resultData = payload

              /* this.$message.error({
                customClass: 'el-toast',
                message: payload.message
              }) */
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
              // console.log('userOperationActionCallback', this.resultData)

              this.resultData = Object.assign({}, this.resultData, payload)
            }
          }
        },
        mounted () {}
      })
    })
})()

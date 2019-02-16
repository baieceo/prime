(function () {
  const componentName = 'i-products'

  const html = `
    <div class="unit-component">
      <component
        :is="uiComponentName"
        :props="resultData"
        :styles="styles"
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
      Vue.component(componentName, {
        template: html,
        props: {
          data: {
            type: Object,
            default () {
              return {}
            }
          }
        },
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
            styles: {
              'module-background-color': {
                type: 'String',
                default: 'red',
                editor: {
                  label: '背景色', // 属性标签
                  type: 'color', // 属性输入类型
                  desc: '设置模块背景颜色'
                },
                value: null // 属性值
              }
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
                    '商品列表请求接口<p>测试连接1：https://www.easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api/tvs#!method=get&t=1</p><p>测试连接2：https://www.easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api/tvs#!method=get&t=2<p>'
                },
                value: null // 属性值
              }
            },
            // 动画
            animates: {
              list: {
                type: 'Object',
                default: {
                  enable: true,
                  loop: true,
                  duration: 5,
                  delay: 2,
                  name: 'bounce',
                  direction: 'reverse',
                  mode: 'forwards'
                },
                editor: {
                  label: '列表动画', // 属性标签
                  type: 'animate', // 属性输入类型
                  default: {
                    enable: false, // 是否启用
                    loop: false, // 是否循环
                    duration: 0, // 速度
                    delay: 0, // 延迟
                    name: '', // 动画名称
                    direction: '', // 方向
                    mode: '' // 动画结束状态
                  }, // 属性默认值
                  desc: '设置列表相关动画'
                },
                value: null // 属性值
              }
            }
          }
        },
        watch: {
          data: {
            handler (newVal, oldVal) {
              console.log('i-products.index.watch.data: ', newVal, oldVal)

              for (let prop in newVal) {
                for (let key in this[prop]) {
                  Object.assign(this[prop][key].value, newVal[prop][key].value)
                }
              }
            },
            deep: true
          }
        },
        methods: {
          // 用户操作回调函数
          userOperationCallback (payload) {
            if (payload.type === 'viewItemDetail') {
              this.resultData.data.dialogVisible = true
              this.resultData.data.detailData = payload.data
            }

            if (payload.type === 'error') {
              this.resultData = payload
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
        },
        created () {
          console.log(55555, 'props', this.props)
          console.log(55555, 'styles', this.styles)
          console.log(55555, 'animates', this.animates)
          console.log(55555, 'data', this.data)
        }
      })
    })
})()

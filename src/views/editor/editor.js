import randomStr from '@/utils/random_str.js'
import defaultCode from './default-code.js'
import navMenu from './components/nav-menu'
import editorControl from './components/editor-control'

// require component
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'

// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/eclipse.css'

const babylon = require('babylon')
const generate = require('@babel/generator').default
const traverse = require('@babel/traverse').default

export default {
  name: 'Editor',
  components: {
    codemirror,
    navMenu,
    editorControl
  },
  data () {
    let devices = [
      {
        name: 'iPhone X',
        width: 375,
        height: 812
      },
      {
        name: 'iPhone 6/7/8 Plus',
        width: 414,
        height: 736
      },
      {
        name: 'iPhone 6/7/8',
        width: 375,
        height: 667
      },
      {
        name: 'iPhone 5/SE',
        width: 320,
        height: 568
      },
      {
        name: 'iPad Pro',
        width: 1024,
        height: 1366
      },
      {
        name: 'iPad',
        width: 768,
        height: 1024
      },
      {
        name: 'Pixel 2 XL',
        width: 411,
        height: 823
      },
      {
        name: 'Pixel 2',
        width: 411,
        height: 731
      },
      {
        name: 'Galaxy S5',
        width: 360,
        height: 640
      },
      {
        name: '自定义',
        custom: true,
        width: 414,
        height: 736
      }
    ]

    return {
      dialogVisible: false,
      code: '',
      codeEditorValue: '',
      cmOptions: {
        tabSize: 4,
        mode: 'text/html',
        theme: 'eclipse',
        lineNumbers: true,
        line: true
      },
      unitComponents: [
        {
          name: '商品列表',
          id: 'unit1',
          type: 'list',
          uiComponent: {
            name: '商品列表',
            style: ''
          },
          logicComponent: '交互组件名称'
        }
      ],
      device: devices[0],
      devices: devices,
      visualDeviceSrc: './visual-device.html',
      visualDeviceWin: null,
      visualDeviceVisible: true,
      componentId: null,
      componentProps: {},
      componentStyles: {},
      componentAnimates: {},
      editorControlVisible: false
    }
  },
  watch: {
    dialogVisible (newVal) {
      if (newVal) {
        // 手动刷新 codemirror 解决 el-dialog 中代码不更新问题
        this.$nextTick(() => {
          this.codemirror.refresh()
        })
      }
    },
    code (newVal) {
      this.sendMessage({
        cmd: 'update',
        params: {
          code: newVal
        }
      })

      this.codeEditorValue = newVal
    }
  },

  created () {
    // 接受父页面发来的信息
    window.addEventListener('message', this.handleMessage)
  },

  beforeDestroy () {
    window.removeEventListener('message', this.handleMessage)
  },

  mounted () {
    // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
    this.visualDeviceWin = this.$refs.visualDevice.contentWindow

    this.visualDeviceWin.onload = () => {
      this.code = defaultCode

      this.visualDeviceVisible = true
    }
  },

  computed: {
    codemirror () {
      return this.$refs.cm.codemirror
    }
  },
  methods: {
    sendMessage (...args) {
      // 外部 vue 向 iframe 内部传数据
      this.visualDeviceWin.postMessage(...args, '*')
    },
    handleMessage (event) {
      var data = event.data

      switch (data.cmd) {
        case 'moveComponentById':
          // 移动组件
          this.moveComponentById(
            event.data.params.id,
            event.data.params.direction
          )

          break
        case 'removeComponentById':
          // 移除组件
          this.$confirm('是否移除该组件?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.removeComponentById(event.data.params.id)
            })
            .catch(() => {})
          break
        case 'settingComponentById':
          // 设置组件
          this.settingComponentById(
            event.data.params.id,
            event.data.params.props,
            event.data.params.styles,
            event.data.params.animates
          )
          break
        default:
          break
      }
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleOpenCodeEditor () {
      this.codeEditorValue = this.code

      this.dialogVisible = true
    },
    handleControlMessage (message) {
      switch (message.cmd) {
        case 'updateComponentData':
          this.handleUpdateComponentData(message.params)
          break
        default:
          break
      }
    },
    handleUpdateComponentData (data) {
      // 1 转化成 ast
      // 2 找到相关组件
      // 3 修改代码
      const code = ''
      let componentId = data.id
      let componentStatement = null
      let script = this.getSource(this.code, 'script')
      let propType = data.type
      let propData = data.data

      const ast = babylon.parse(script, {
        sourceType: 'module'
      })

      traverse(ast, {
        ObjectProperty (path) {
          // 找到 components 数组
          if (path.node.key.name === 'components') {
            // 查找组件数组
            path.traverse({
              ObjectExpression (objectExpression) {
                // 查找数组项
                objectExpression.traverse({
                  Property (property) {
                    if (
                      property.node.key.name === 'id' &&
                      property.node.value.value === componentId
                    ) {
                      componentStatement = objectExpression
                    }
                  }
                })
              }
            })
          }
        }
      })

      if (componentStatement) {
        componentStatement.traverse({
          Property (property) {
            if (property.node.key.name === 'props') {
              property.traverse({
                Property (item) {
                  let key = item.node.key.name

                  if (key === 'value') {
                    item.traverse({
                      Property (prop) {
                        let propKey = prop.node.key.name

                        if (propKey === 'value') {
                          console.log(88888888, propData[key].value)

                          /* prop.replaceWithSourceString(
                            '{value: 123123123}'
                            // `value: ${propData[key].value}`
                          ) */
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }

      // 生成 code
      const output = generate(ast, {}, code)

      // console.log('output.code: ', output.code)

      this.code = this.code.replace(script, output.code)
    },
    onCmReady (/* cm */) {},
    onCmFocus (/* cm */) {},
    onCmCodeChange (newCode) {
      this.codeEditorValue = newCode
    },
    mounted () {},
    getSource (source, type) {
      const regex = new RegExp(`<${type}[^>]*>`)
      let openingTag = source.match(regex)

      if (!openingTag) return ''
      else openingTag = openingTag[0]

      // 切分对应 codeBody
      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      )
    },
    // 添加组件
    addComponent (componentName) {
      let context = this.parseStrToDom(this.getSource(this.code, 'template'))
      let container = document.createElement('i-component')
      let component = document.createElement(componentName)

      container.id = randomStr()
      container.appendChild(component)

      context.appendChild(container)

      let template = this.getSource(this.code, 'template')

      this.code = this.code.replace(template, this.parseDomToStr(context))

      this.sendMessage({
        cmd: 'update',
        params: {
          code: this.code
        }
      })
    },
    // 通过字符串创建创建元素
    parseStrToDom (str) {
      let context = document.createElement('div')

      context.innerHTML = str

      return context.children[0]
    },
    // DOM 转字符串
    parseDomToStr (dom) {
      let context = document.createElement('div')

      context.appendChild(dom)

      return context.innerHTML
    },
    nextSibling (obj) {
      return obj.nextElementSibling || obj.nextSibling
    },
    prevSibling (obj) {
      return obj.previousElementSibling || obj.previousSibling
    },
    // 移动组件
    moveComponentById (id, direction) {
      let context = this.parseStrToDom(this.getSource(this.code, 'template'))
      let target = context.querySelector(`[id="${id}"]`)

      if (target) {
        if (direction === 'up') {
          let prev = this.prevSibling(target)

          if (prev) {
            context.insertBefore(target, prev)
          }

          prev = null
        }

        if (direction === 'down') {
          let next = this.nextSibling(target)

          if (next) {
            context.insertBefore(next, target)
          }

          next = null
        }

        target = null
      }

      let template = this.getSource(this.code, 'template')

      this.code = this.code.replace(template, this.parseDomToStr(context))
    },
    // 移除组件
    removeComponentById (id) {
      // 1. 移除单独在代码中 template 写入的组件
      let context = this.parseStrToDom(this.getSource(this.code, 'template'))
      let target = context.querySelector(`[id="${id}"]`)

      if (target) {
        target.parentNode.removeChild(target)

        target = null
      }

      let template = this.getSource(this.code, 'template')

      this.code = this.code.replace(template, this.parseDomToStr(context))

      // 2. 移除在 script 中 components 数组定义的组件
      let script = this.getSource(this.code, 'script')

      const ast = babylon.parse(script, {
        sourceType: 'module'
      })

      traverse(ast, {
        ObjectProperty (path) {
          // 找到 components 数组
          if (path.node.key.name === 'components') {
            path.traverse({
              ObjectExpression (p) {
                // 移除目标 id 数组项
                if (
                  p.node.properties.find(
                    i => i.key.name === 'id' && i.value.value === id
                  )
                ) {
                  p.remove()
                }
              }
            })
          }
        }
      })

      const code = ''

      // 生成 code
      const output = generate(ast, {}, code)

      this.code = this.code.replace(script, output.code)

      this.componentProps = {}
      this.componentStyles = {}
      this.componentAnimates = {}
    },
    // 设置组件
    settingComponentById (
      componentId,
      componentProps,
      componentStyles,
      componentAnimates
    ) {
      this.componentId = componentId
      this.componentProps = componentProps
      this.componentStyles = componentStyles
      this.componentAnimates = componentAnimates

      this.editorControlVisible = true
    },
    handleCodeChange () {
      this.dialogVisible = false

      this.code = this.codeEditorValue
    }
  }
}

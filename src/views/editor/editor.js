import randomStr from '@/utils/random_str.js'
import defaultCode from './default-code.js'
import navMenu from './components/nav-menu'
import editorControl from './components/editor-control'
import devices from './devices'

// require component
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'

// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/eclipse.css'
import { isTerminatorless } from '@babel/types'

const babylon = require('@babel/parser')
const t = require('babel-types')
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

      // debugger

      this.codeEditorValue = newVal
    }
  },

  created () {
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
    handleClose () {
      this.dialogVisible = false
    },
    handleOpenCodeEditor () {
      this.codeEditorValue = this.code

      let delay = 0

      if (this.editorControlVisible === true) {
        delay = 300

        this.editorControlVisible = false
      }

      setTimeout(() => {
        this.dialogVisible = true
      }, delay)
    },
    sendMessage (...args) {
      // 外部 vue 向 iframe 内部传数据
      this.visualDeviceWin.postMessage(...args, '*')
    },
    handleMessage (event) {
      if (!event.data || !event.data.cmd) return false

      let data = event.data

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
        case 'openControlPanel':
          // 设置组件
          this.openControlPanel(
            event.data.params.id,
            event.data.params.props,
            event.data.params.styles,
            event.data.params.animates
          )
          break
        case 'updateComponentData':
          this.handleUpdateComponentData(
            event.data.params.id,
            event.data.params.type,
            event.data.params.data
          )
          break
        default:
          break
      }
    },
    pathIsComponentById (path, componentId) {
      return !!(
        path.node.properties.find(item => item.key.name === 'id') &&
        path.node.properties.find(item => item.key.name === 'name') &&
        path.node.properties.find(item => item.key.name === 'data') &&
        path.node.properties.find(item => item.key.name === 'version') &&
        path.node.properties.find(
          item => item.key.name === 'id' && item.value.value === componentId
        )
      )
    },
    handleUpdateComponentData (componentId, propType, propData) {
      const code = ''
      const me = this

      let componentStatement = null

      let script = this.getSource(this.code, 'script')

      const ast = babylon.parse(script, {
        sourceType: 'module'
      })

      // 1. 查找组件项，组件同时包含 id、name、data、version 属性
      traverse(ast, {
        ObjectProperty (path) {
          if (me.pathIsComponentById(path.parentPath, componentId)) {
            componentStatement = path.parentPath
          }
        }
      })

      // 5. 查找属性值并修改
      // 修改节点值
      // node.replaceWith(t.valueToNode(value))
      // path.node.value = t.valueToNode(value)
      // path.replaceWithSourceString('${value}')
      const propValueVisitor = {
        ObjectProperty: {
          enter (path, { key }) {
            const expr = path.node

            if (expr.key && expr.key.name && expr.key.name === 'value') {
              path.node.value = t.valueToNode(propData[key].value)
            }
          }
        }
      }

      // 4. 查找属性项
      const propItemVisitor = {
        ObjectProperty: {
          enter (path, state) {
            const expr = path.node

            Object.keys(propData).forEach(key => {
              if (expr.key && expr.key.name && expr.key.name === key) {
                path.traverse(propValueVisitor, { key })
              }
            })
          }
        },
        // 处理键名为字符的情况
        StringLiteral: {
          enter (path, state) {
            Object.keys(propData).forEach(key => {
              if (path.key === 'key' && path.node.value === key) {
                path.parentPath.traverse(propValueVisitor, { key })
              }
            })
          }
        }
      }

      // 3. 查找数据类型
      const propTypeVisitor = {
        ObjectProperty: {
          enter (path, state) {
            const expr = path.node

            if (expr.key && expr.key.name === propType) {
              path.traverse(propItemVisitor, state)
            }
          }
        }
      }

      // 2. 查找组件 data 属性
      if (componentStatement) {
        componentStatement.traverse({
          ObjectExpression: {
            // 修改属性
            enter (path, state) {
              const expr = path.parentPath.node
              const dataExpr =
                expr.key &&
                expr.key.name === 'data' &&
                path.parentPath.parent.properties.find(
                  item => item.key.name === 'id'
                )

              if (dataExpr) {
                path.traverse(propTypeVisitor, state)
              }
            }
          }
        })
      }

      // 生成 code
      const output = generate(ast, {}, code)

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
    moveComponentById (componentId, direction) {
      const me = this

      let script = this.getSource(this.code, 'script')

      const ast = babylon.parse(script, {
        sourceType: 'module'
      })

      traverse(ast, {
        ArrayExpression: {
          enter (path) {
            console.log(123, path)

            // 暂时只支持删除在 components 数组内的组件
            // components 数组没定义的组件暂时无法删除，因需要修改 template 删除对应组件 html，此部分功能暂时没开发
            if (
              me.pathIsComponentById(path, componentId) &&
              path.parentPath.node &&
              path.parentPath.node.elements
            ) {
              let componentIndex = null

              console.log(
                path,
                path.key,
                path.inList,
                path.getSibling(path.key + 1)
              )

              path.insertAfter(path.getSibling(path.key + 1))

              // 查找组件索引
              /* path.parentPath.node.elements.find(item => {
              item.properties.find((nodeItem, nodeIndex) => {
                if (
                  nodeItem.key &&
                  nodeItem.key.name &&
                  nodeItem.key.name === 'id' &&
                  nodeItem.value &&
                  nodeItem.value.value === componentId
                ) {
                  componentIndex = nodeIndex
                }
              })
            }) */

              /* console.log(
              path,
              componentIndex,
              path.container[componentIndex + 1],
              direction
            ) */

              /* if (
              componentIndex !== null &&
              path.container[componentIndex + 1] &&
              direction === 'down'
            ) {
              // path.insertAfter(path.container[componentIndex + 1])
              // path.replaceWithSourceString('111')
              console.log(22222, path.container())
              // path.insertAfter(path.getSibling(1))
            } */
            }
          }
        }
      })

      const code = ''

      // 生成 code
      const output = generate(ast, {}, code)

      this.code = this.code.replace(script, output.code)
    },
    // 移除组件
    removeComponentById (componentId) {
      const me = this

      let script = this.getSource(this.code, 'script')

      const ast = babylon.parse(script, {
        sourceType: 'module'
      })

      traverse(ast, {
        ObjectExpression (path) {
          // 暂时只支持删除在 components 数组内的组件
          // components 数组没定义的组件暂时无法删除，因需要修改 template 删除对应组件 html，此部分功能暂时没开发
          if (me.pathIsComponentById(path, componentId)) {
            path.remove()
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
    openControlPanel (
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

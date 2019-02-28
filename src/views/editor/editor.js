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
    handleUpdateComponentData (componentId, propType, propData) {
      const code = ''

      let componentStatement = null

      let script = this.getSource(this.code, 'script')

      const ast = babylon.parse(script, {
        sourceType: 'module'
      })

      // 1. 查找组件项，组件同时包含 id、name、data、version 属性
      //
      traverse(ast, {
        ObjectProperty (path) {
          if (
            path.parentPath.node.properties.find(
              item => item.key.name === 'id'
            ) &&
            path.parentPath.node.properties.find(
              item => item.key.name === 'name'
            ) &&
            path.parentPath.node.properties.find(
              item => item.key.name === 'data'
            ) &&
            path.parentPath.node.properties.find(
              item => item.key.name === 'version'
            ) &&
            path.parentPath.node.properties.find(
              item => item.key.name === 'id' && item.value.value === componentId
            )
          ) {
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

      // console.log('output.code: ', output.code)
      let outputCode = this.code.replace(script, output.code)

      this.code = outputCode
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

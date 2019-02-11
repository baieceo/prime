import Vue from 'vue'

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
      settings: []
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
            event.data.params.settings
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
      let container = document.createElement('i-container')
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
      let context = this.parseStrToDom(this.getSource(this.code, 'template'))
      let target = context.querySelector(`[id="${id}"]`)

      if (target) {
        target.parentNode.removeChild(target)

        target = null
      }

      let template = this.getSource(this.code, 'template')

      this.code = this.code.replace(template, this.parseDomToStr(context))

      this.settings = []
    },
    // 设置组件
    settingComponentById (id, settings) {
      this.settings = settings
      // alert(id)
    },
    handleCodeChange () {
      this.dialogVisible = false

      this.code = this.codeEditorValue
    }
  }
}

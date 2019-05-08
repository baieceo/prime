(function () {
  let app = new Vue({
    el: '#visual-device',
    props: {
      code: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        html: '',
        js: '',
        css: '',
        component: null,
        id: utils.randomStr()
      }
    },
    methods: {
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
      // 切分代码
      splitCode () {
        const script = this.getSource(this.code, 'script').replace(
          /export default/,
          'return'
        )
        const style = this.getSource(this.code, 'style')
        const template = this.getSource(this.code, 'template')

        this.js = script
        this.css = style
        this.html = template
      },
      // 渲染代码
      renderCode () {
        this.splitCode()

        if (this.html !== '' && this.js !== '') {
          // 创建 Function 获取执行对象
          const parseStrToFunc = new Function(this.js)()

          parseStrToFunc.template = this.html

          // 继承 parseStrToFunc 组件
          const Component = Vue.extend(parseStrToFunc)

          // 手动挂载
          this.component = new Component().$mount()
          // 插入页面
          this.$refs.display.appendChild(this.component.$el)

          if (this.css !== '') {
            const style = document.createElement('style')

            style.type = 'text/css'
            style.id = this.id
            style.innerHTML = this.css

            document.getElementsByTagName('head')[0].appendChild(style)
          }
        }
      },
      destroyCode () {
        const $target = document.getElementById(this.id)

        // 移除 style
        if ($target) $target.parentNode.removeChild($target)

        if (this.component) {
          // 移除组件 DOM
          this.$refs.display.removeChild(this.component.$el)

          // 销毁组件
          this.component.$destroy()
          // 重置组件引用
          this.component = null
        }
      }
    },
    mounted () {
      this.renderCode()
    },
    beforeDestroy () {
      this.destroyCode()
    },
    watch: {
      code () {
        this.destroyCode()
        this.renderCode()
      }
    }
  })

  // 接受父页面发来的信息
  window.addEventListener('message', function (event) {
    var data = event.data

    switch (data.cmd) {
      case 'update':
        // 处理业务逻辑
        app.code = data.params.code

        break
      default:
        break
    }
  })
})()

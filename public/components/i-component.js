(function () {
  const componentName = 'i-component'

  /* 定义 css */
  const css = `
    .i-component {
      &:hover {
        position: relative;
        z-index: 1;
        box-shadow: 0 0 0 1px #08ce96;

        .i-component-operation {
          display: block;
        }

        &:before, &:after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 1;
          width: 1px;
          height: 100%;
          background-color: #08ce96;
        }

        &:before {
          left: 0;
        }

        &:after {
          right: 1px;
        }
      }

      &-operation {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        display: none;
        background-color: #08ce96;
        padding: 2px 4px;
      }

      &-moveup,
      &-movedown,
      &-remove,
      &-setting {
        display: inline-block;
        color: #fff;
        font-size: 14px;
        text-align: center;
        text-decoration: none;
        opacity: 0.5;
        transition: 0.3s opacity ease;

        &::before {
          display: inline-block;
        }

        &:hover {
          opacity: 1;
        }
      }

      &-movedown {
        margin-left: 0.5em;
      }
    }
  `
  /* 定义 html */
  const html = `
    <div class="i-component" :id="this.id">
      <div class="i-component-operation">
        <a
          href="javascript:;"
          class="i-component-setting el-icon-setting"
          title="设置"
          @click="handleSetting"
        ></a>
        <a
          href="javascript:;"
          class="i-component-moveup el-icon-sort-up"
          title="上移"
          @click="handleMove('up')"
        ></a>
        <a
          href="javascript:;"
          class="i-component-movedown el-icon-sort-down"
          title="下移"
          @click="handleMove('down')"
        ></a>
        <a
          href="javascript:;"
          class="i-component-remove el-icon-delete"
          title="删除"
          @click="handleRemove"
        ></a>
      </div>
      
      <slot name="header"></slot>

      <component :is="name" :data="data"></component>

      <slot name="footer"></slot>
    </div>
  `

  /* 渲染 css */
  utils.lessRender(css)

  /* 定义组件 */
  Vue.component(componentName, {
    template: html,
    props: {
      id: {
        type: String,
        default: utils.randomStr()
      },
      data: {
        type: Object,
        default () {
          return {}
        }
      },
      name: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    methods: {
      // 移动组件
      handleMove (direction) {
        window.parent.postMessage(
          {
            cmd: 'moveComponentById',
            params: {
              id: this.id,
              direction: direction
            }
          },
          '*'
        )
      },
      // 删除组件
      handleRemove (ev) {
        window.parent.postMessage(
          {
            cmd: 'removeComponentById',
            params: {
              id: this.id
            }
          },
          '*'
        )
      },
      // 设置属性
      handleSetting (ev) {
        let component = this.$children[0]

        window.parent.postMessage(
          {
            cmd: 'settingComponentById',
            params: {
              id: this.id,
              props: component.props || {},
              styles: component.styles || {},
              animates: component.animates || {}
            }
          },
          '*'
        )
      },
      // 处理消息
      handleMessage (ev) {
        if (ev.data.cmd === 'updateComponentData') {
          this.updateComponentData(ev)
        }
      },
      isEmptyJson (json) {
        return JSON.stringify(json) === '{}'
      },
      // 更新子组件属性
      updateComponentData (ev) {
        let id = ev.data.params.id
        let type = ev.data.params.type
        let data = ev.data.params.data
        let component = this.$children[0]

        if (
          id === this.id &&
          component &&
          component[type] &&
          !this.isEmptyJson(data)
        ) {
          // console.log('子组件', component.props)
          // console.log('接收到', props)

          component[type] = data
        }
      },
      // 初始化子组件
      initComponent (component) {
        // 组件内部初始化函数，必须存在，每个组件都一致
        let types = ['props', 'styles', 'animates']

        console.log(11111111, component)

        types.forEach(type => {
          for (let key in component[type]) {
            if (component[type][key].value === null) {
              component[type][key].value = component[type][key].default
            }

            if (
              component.data &&
              component.data[type] &&
              component.data[type][key] !== undefined
            ) {
              if (typeof component.data[type][key].value === 'object') {
                Object.assign(
                  component[type][key].value,
                  component.data[type][key].value
                )
              } else {
                component[type][key].value = component.data[type][key].value
              }
            }
          }
        })
      }
    },
    mounted () {
      window.addEventListener('message', this.handleMessage)

      console.log(2222, this)

      this.initComponent(this.$children[0])
    }
  })
})()

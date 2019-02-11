(function () {
  /* 定义 css */
  const css = `
    .i-component-container {
      &:hover {
        position: relative;
        z-index: 1;
        box-shadow: 0 0 0 1px #08ce96;

        .i-component-container-operation {
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
    <div class="i-component-container">
      <div class="i-component-container-operation">
        <a
          href="javascript:;"
          class="i-component-container-setting el-icon-setting"
          title="设置"
          @click="handleSetting"
        ></a>
        <a
          href="javascript:;"
          class="i-component-container-moveup el-icon-sort-up"
          title="上移"
          @click="handleMove('up')"
        ></a>
        <a
          href="javascript:;"
          class="i-component-container-movedown el-icon-sort-down"
          title="下移"
          @click="handleMove('down')"
        ></a>
        <a
          href="javascript:;"
          class="i-component-container-remove el-icon-delete"
          title="删除"
          @click="handleRemove"
        ></a>
      </div>

      <slot></slot>
    </div>
  `

  /* 渲染 css */
  utils.lessRender(css)

  /* 定义组件 */
  Vue.component('i-container', {
    template: html,
    props: {
      id: {
        type: String,
        default: utils.randomStr()
      }
    },
    data () {
      return {}
    },
    methods: {
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
      handleSetting (ev) {
        window.parent.postMessage(
          {
            cmd: 'settingComponentById',
            params: {
              id: this.id,
              settings: this.$children[0].props || []
            }
          },
          '*'
        )
      }
    }
  })
})()

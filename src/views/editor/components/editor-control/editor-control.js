import Vue from 'vue'

export default {
  props: {
    id: null,
    visible: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default () {
        return {}
      }
    },
    styles: {
      type: Object,
      default () {
        return {}
      }
    },
    animates: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      collapsed: false,
      animateGroups: [
        {
          label: '弹跳入场',
          options: [
            {
              value: 'bounceIn',
              label: '弹入'
            },
            {
              value: 'bounceInDown',
              label: '上方弹入'
            },
            {
              value: 'bounceInLeft',
              label: '左侧弹入'
            },
            {
              value: 'bounceInRight',
              label: '右侧弹入'
            },
            {
              value: 'bounceInUp',
              label: '下方弹入'
            }
          ]
        },
        {
          label: '弹跳出场',
          options: [
            {
              value: 'bounceOut',
              label: '弹出'
            },
            {
              value: 'bounceOutDown',
              label: '下方弹出'
            },
            {
              value: 'bounceOutLeft',
              label: '左侧弹出'
            },
            {
              value: 'bounceOutRight',
              label: '右侧弹出'
            },
            {
              value: 'bounceOutUp',
              label: '上方弹出'
            }
          ]
        },
        {
          label: '渐变入场',
          options: [
            {
              value: 'fadeIn',
              label: '淡入'
            },
            {
              value: 'fadeInDown',
              label: '上方淡入'
            },
            {
              value: 'fadeInDownBig',
              label: '上方淡入加强'
            },
            {
              value: 'fadeInLeft',
              label: '左侧淡入'
            },
            {
              value: 'fadeInLeftBig',
              label: '左侧淡入加强'
            },
            {
              value: 'fadeInRight',
              label: '右侧淡入'
            },
            {
              value: 'fadeInRightBig',
              label: '右侧淡入加强'
            },
            {
              value: 'fadeInUp',
              label: '下方淡入'
            },
            {
              value: 'fadeInUpBig',
              label: '下方淡入加强'
            }
          ]
        },
        {
          label: '渐变出场',
          options: [
            {
              value: 'fadeOut',
              label: '淡出'
            },
            {
              value: 'fadeOutDown',
              label: '下方淡出'
            },
            {
              value: 'fadeOutDownBig',
              label: '下方淡出加强'
            },
            {
              value: 'fadeOutLeft',
              label: '左侧淡出'
            },
            {
              value: 'fadeOutLeftBig',
              label: '左侧淡出加强'
            },
            {
              value: 'fadeOutRight',
              label: '右侧淡出'
            },
            {
              value: 'fadeOutRightBig',
              label: '右侧淡出加强'
            },
            {
              value: 'fadeOutUp',
              label: '上方淡出'
            },
            {
              value: 'fadeOutUpBig',
              label: '上方淡出加强'
            }
          ]
        },
        {
          label: '旋转入场',
          options: [
            {
              value: 'rotateIn',
              label: '中心旋转淡入'
            },
            {
              value: 'rotateInDownLeft',
              label: '左上旋转淡入'
            },
            {
              value: 'rotateInDownRight',
              label: '右上旋转淡入'
            },
            {
              value: 'rotateInUpLeft',
              label: '左下旋转淡入'
            },
            {
              value: 'rotateInUpRight',
              label: '右下旋转淡入'
            }
          ]
        },
        {
          label: '旋转出场',
          options: [
            {
              value: 'rotateOut',
              label: '中心旋转淡出'
            },
            {
              value: 'rotateOutDownLeft',
              label: '左下旋转淡出'
            },
            {
              value: 'rotateOutDownRight',
              label: '右下旋转淡出'
            },
            {
              value: 'rotateOutUpLeft',
              label: '左上旋转淡出'
            },
            {
              value: 'rotateOutUpRight',
              label: '右上旋转淡出'
            }
          ]
        },
        {
          label: '滑动效果',
          options: [
            {
              value: 'slideInDown',
              label: '上方滑入'
            },
            {
              value: 'slideInLeft',
              label: '左侧滑入'
            },
            {
              value: 'slideInRight',
              label: '右侧滑入'
            },
            {
              value: 'slideOutLeft',
              label: '左侧滑出'
            },
            {
              value: 'slideOutRight',
              label: '右侧滑出'
            },
            {
              value: 'slideOutUp',
              label: '上方滑出'
            }
          ]
        },
        {
          label: '翻转效果',
          options: [
            {
              value: 'flip',
              label: '翻转'
            },
            {
              value: 'flipInX',
              label: '横轴翻入'
            },
            {
              value: 'flipInY',
              label: '纵轴翻入'
            },
            {
              value: 'filpOutX',
              label: '横轴翻出'
            },
            {
              value: 'flipOutY',
              label: '纵轴翻出'
            }
          ]
        },
        {
          label: '快速效果',
          options: [
            {
              value: 'lightSpeedIn',
              label: '快速入场'
            },
            {
              value: 'lightSpeedOut',
              label: '快速出场'
            }
          ]
        },
        {
          label: '强调效果',
          options: [
            {
              value: 'bounce',
              label: '弹跳'
            },
            {
              value: 'flash',
              label: '闪烁'
            },
            {
              value: 'pulse',
              label: '脉冲'
            },
            {
              value: 'rubberBand',
              label: '橡皮筋拉动'
            },
            {
              value: 'shake',
              label: '震颤'
            },
            {
              value: 'swing',
              label: '摇摆'
            },
            {
              value: 'wobble',
              label: '摇晃'
            },
            {
              value: 'tada',
              label: '振铃'
            }
          ]
        },
        {
          label: '特殊效果',
          options: [
            {
              value: 'hinge',
              label: '落叶弹出'
            },
            {
              value: 'rollIn',
              label: '左侧滚入'
            },
            {
              value: 'rollOut',
              label: '右侧滚出'
            }
          ]
        }
      ]
    }
  },
  watch: {
    props: {
      handler (newVal) {
        this.updateComponentData('props', newVal)
      },
      deep: true
    },
    styles: {
      handler (newVal) {
        this.updateComponentData('styles', newVal)
      },
      deep: true
    },
    animates: {
      handler (newVal) {
        this.updateComponentData('animates', newVal)
      },
      deep: true
    },
    visible (newVal) {
      this.$emit('update:visible', newVal)
    }
  },
  methods: {
    toggleVisible () {
      this.$emit('update:visible', !this.visible)
    },
    updateComponentData (type, data) {
      this.$parent.sendMessage({
        cmd: 'updateComponentData',
        params: {
          id: this.id,
          type: type,
          data: data
        }
      })

      this.$emit('message', {
        cmd: 'updateComponentData',
        params: {
          id: this.id,
          type: type,
          data: data
        }
      })
    },
    isEmptyJson (json) {
      return JSON.stringify(json) === '{}'
    },
    handleChange (value, item) {
      item.value = value
    },
    getControlValue (item, key) {
      let value

      if (key !== undefined) {
        // 处理动画属性
        if (item.value !== null) {
          if (item.value[key] !== undefined) {
            value = item.value[key]
          } else {
            value = item.default[key]
          }
        } else {
          value = item.default[key]
        }
      } else {
        // 处理非动画属性
        if (item.value !== null) {
          value = item.value
        } else {
          value = item.default
        }
      }

      return value
    },
    handleControlChange (ev, item, type, key) {
      let value = ev.target ? ev.target.value : ev

      if (type === 'animates') {
        if (item.value === null) {
          item.value = {}
        }

        if (item.value[key] === undefined) {
          Vue.set(item.value, key, value)
          // debugger
        } else {
          item.value[key] = value
        }
      } else {
        item.value = value
      }

      this.$parent.sendMessage({
        cmd: 'updateComponentData',
        params: {
          id: this.id,
          data: this[type],
          type: type
        }
      })
    }
  }
}

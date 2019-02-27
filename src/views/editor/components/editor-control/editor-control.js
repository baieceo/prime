import animateGroups from './animate-groups'

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
      animateGroups: animateGroups
    }
  },
  watch: {
    props: {
      handler (newVal, oldVal) {
        this.updateComponentData('props', newVal)
      },
      deep: true
    },
    styles: {
      handler (newVal, oldVal) {
        this.updateComponentData('styles', newVal)
      },
      deep: true
    },
    animates: {
      handler (newVal, oldVal) {
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
      /* this.$parent.sendMessage({
        cmd: 'updateComponentData',
        params: {
          id: this.id,
          type: type,
          data: data
        }
      }) */

      this.$emit('message', {
        data: {
          cmd: 'updateComponentData',
          params: {
            id: this.id,
            type: type,
            data: data
          }
        }
      })
    },
    isEmptyJson (json) {
      return JSON.stringify(json) === '{}'
    },
    handleChange (value, item) {
      item.value = value
    }
  }
}

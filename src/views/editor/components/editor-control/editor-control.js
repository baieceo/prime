export default {
  props: {
    id: null,
    settings: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      collapsed: false
    }
  },
  watch: {
    settings: {
      handler (newVal) {
        this.collapsed = newVal && newVal.length
      },
      deep: true
    }
  },
  methods: {
    getControlItemValue (control) {
      return control.value || control.default
    },
    handleControlItemChange (ev, control) {
      control.value = ev.target.value

      this.$parent.sendMessage({
        cmd: 'update',
        params: {
          id: this.id,
          settings: this.settings
        }
      })
    }
  }
}

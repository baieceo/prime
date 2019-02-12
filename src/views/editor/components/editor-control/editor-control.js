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
      /*
      console.log(
        '修改前 editor-control',
        JSON.parse(JSON.stringify(this.settings))
      )
      */

      control.value = ev.target.value

      /*
      console.log(
        '修改后 editor-control',
        JSON.parse(JSON.stringify(this.settings))
      )
      */

      this.$parent.sendMessage({
        cmd: 'updateComponentProps',
        params: {
          id: this.id,
          props: this.settings
        }
      })
    }
  }
}

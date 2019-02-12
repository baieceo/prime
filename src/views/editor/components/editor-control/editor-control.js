export default {
  props: {
    id: null,
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
    }
  },
  data () {
    return {
      collapsed: false
    }
  },
  watch: {
    props: {
      handler (newVal) {
        this.collapsed = newVal && !this.isEmptyJson(newVal)
      },
      deep: true
    }
  },
  methods: {
    isEmptyJson (json) {
      return JSON.stringify(json) === '{}'
    },
    getControlValue (control) {
      return control.value || control.default
    },
    handleControlChange (ev, control, type) {
      /*
      console.log(
        '修改前 editor-control',
        JSON.parse(JSON.stringify(this[type]))
      )
      */

      let value = ev.target ? ev.target.value : ev

      control.value = value

      /*
      console.log(
        '修改后 editor-control',
        JSON.parse(JSON.stringify(this[type]))
      )
      */

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

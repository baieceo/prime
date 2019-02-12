export default {
  props: {
    id: null,
    props: {
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
    getPropValue (control) {
      return control.value || control.default
    },
    handlePropChange (ev, control) {
      /*
      console.log(
        '修改前 editor-control',
        JSON.parse(JSON.stringify(this.props))
      )
      */

      control.value = ev.target.value

      /*
      console.log(
        '修改后 editor-control',
        JSON.parse(JSON.stringify(this.props))
      )
      */

      this.$parent.sendMessage({
        cmd: 'updateComponentProps',
        params: {
          id: this.id,
          props: this.props
        }
      })
    }
  }
}

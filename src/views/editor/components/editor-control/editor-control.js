export default {
  props: {
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
  }
}

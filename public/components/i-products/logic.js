(function () {
  const html = '<div></div>'

  Vue.component('i-products-logic', {
    template: html,
    data () {
      return {
        action: {
          message: '交互组件',
          data: {
            dialogVisible: false,
            detailData: {}
          },
          type: ''
        }
      }
    },
    props: {
      props: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    watch: {
      payload: {
        handle () {
          this.$emit('finish', this.action)
        },
        deep: true
      },
      props: {
        handler (newVal, oldVal) {
          if (newVal.api.value !== oldVal.api.value) {
            this.action.type = 'init'

            this.$emit('init', this.action)

            this.fetchData()
          }
        },
        deep: true
      }
    },
    created () {
      this.fetchData()
    },
    mounted () {
      this.action.type = 'init'

      this.$emit('init', this.action)
    },
    methods: {
      fetchData () {
        alert(this.props.api.value)
        window
          .fetch(this.props.api.value)
          .then(res => res.json())
          .then(res => {
            this.action.type = 'loadDataFinish'
            this.action.data.list = res.data

            this.$emit('finish', this.action)
          })
          .catch(e => {
            this.action.type = 'error'
            this.action.message = '网络错误'

            this.$emit('action', this.action)
          })
      }
    }
  })
})()

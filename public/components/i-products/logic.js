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
        type: Array,
        default () {
          return []
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
          console.log(11111, newVal)
          if (
            this.getProp(newVal, 'data', 'api') !==
            this.getProp(oldVal, 'data', 'api')
          ) {
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
      getProp (props, groupKey, propKey) {
        return (
          this.props
            .find(prop => prop.key === groupKey)
            .value.find(prop => prop.key === propKey) || {}
        )
      },
      fetchData () {
        let propApi = this.getProp(this.props, 'data', 'api')
        let api = propApi.value || propApi.default

        fetch(api)
          .then(res => res.json())
          .then(res => {
            setTimeout(() => {
              this.action.type = 'loadDataFinish'
              this.action.data.list = res.data

              this.$emit('finish', this.action)
            }, 300)
          })
      }
    }
  })
})()

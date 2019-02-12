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
          /*
          console.log(
            'product.logic',
            this.getProp(newVal, 'data', 'api'),
            this.getProp(oldVal, 'data', 'api')
          )
          */

          if (
            this.getProp(newVal, 'data', 'api').value !==
            this.getProp(oldVal, 'data', 'api').value
          ) {
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
      getProp (props, groupKey, propKey) {
        return (
          props
            .find(prop => prop.key === groupKey)
            .value.find(prop => prop.key === propKey) || {}
        )
      },
      fetchData () {
        let propApi = this.getProp(this.props, 'data', 'api')
        let api = propApi.value || propApi.default

        window
          .fetch(api)
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

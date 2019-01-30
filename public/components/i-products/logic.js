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
      metaData: {
        type: Object,
        default () {
          return {
            name: '交互组件'
          }
        }
      }
    },
    watch: {
      payload: {
        handle () {
          this.$emit('finish', this.action)
        },
        deep: true
      }
    },
    created () {
      fetch(
        'https://www.easy-mock.com/mock/5c47f3ae9f1c8a370307b142/api/tvs#!method=get'
      )
        .then(res => res.json())
        .then(res => {
          setTimeout(() => {
            this.action.type = 'loadDataFinish'
            this.action.data.list = res.data

            this.$emit('finish', this.action)
          }, 300)
        })
    },
    mounted () {
      this.action.type = 'init'

      this.$emit('init', this.action)
    }
  })
})()

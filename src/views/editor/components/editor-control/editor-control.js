export default {
  props: {
    props: {
      type: Array,
      default () {
        return [
          {
            label: '格式',
            key: 'format',
            value: [
              {
                label: '尺寸',
                key: 'size',
                type: 'input',
                desc: '描述',
                value: ''
              },
              {
                label: '尺寸',
                key: 'size',
                type: 'input',
                desc: '描述',
                value: ''
              }
            ]
          },
          {
            label: '格式',
            key: 'format2',
            value: [
              {
                label: '尺寸',
                key: 'size',
                type: 'input',
                desc: '描述',
                value: ''
              }
            ]
          }
        ]
      }
    }
  }
}

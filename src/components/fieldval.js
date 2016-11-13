export default {
  name: 'FieldVal',
  props: {
    name: {type: String},
    value: {type: String}
  },
  render (createElement) {
    return createElement('span', {
      domProps: {
        innerHTML: this.value
      }
    })
  }
}

import FieldVal from './fieldval'
export default {
  name: 'Field',
  props: {
    name: {type: String},
    item: {type: Object}
  },
  data () {
    return {
      fieldValues: []
    }
  },
  beforeMount () {
    const findVals = (nodes) => {
      for (var i=0; i < nodes.length; i++) {
        let node = nodes[i]
        if (node.componentOptions && (node.componentOptions.tag === 'field-val')) {
          return node
        }

        if (node.children && node.children.length) {
          return findVals(node.children)
        }
      }
    }

    let childrenVals = findVals(this.$slots.default)

    console.log(childrenVals)

    this.fieldValues = childrenVals.map(node => {
      if (node.componentOptions) {
        var data = node.componentOptions.propsData
        data.value = this.item[data.name]
      }
      return node
    })

  },
  render (h) {
    return (
      <div>
        { this.$slots.default }
      </div>
    )
  },
  components: {FieldVal}
}

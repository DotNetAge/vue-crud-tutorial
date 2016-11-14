import _ from 'lodash'
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
  // beforeMount () {
  //   const findVals = (nodes) => {
  //     var results = []
  //     nodes.forEach(node => {
  //       if (node.tag && (node.tag === 'field-val' || _.endsWith(node.tag.toLowerCase(), 'fieldval'))) {
  //         results.push(node)
  //       }
  //
  //       if (node.children && node.children.length) {
  //         var children = findVals(node.children)
  //         if (children && children.length) {
  //           results = results.concat(children)
  //         }
  //       }
  //     })
  //     return results
  //   }
  //
  //   if (this.$slots.default) {
  //     let childrenVals = findVals(this.$slots.default)
  //     this.fieldValues = childrenVals.map(node => {
  //       if (node.componentOptions) {
  //         var data = node.componentOptions.propsData
  //         data.value = this.item[data.name ? data.name : this.name]
  //       }
  //       return node
  //     })
  //   }
  // },
  computed: {},
  render (h) {
    // var childrenComponents = this.$slots.default ? this.$slots.default : [createElement('span', {
    //   domProps: {
    //     innerHTML: this.item[this.name]
    //   }
    // })]
    // console.log(this.name)
    return (
      <td data-name={this.name}>
        { this.item[this.name] }
      </td>
    )

    // return createElement('td', {
    //   attrs: {
    //     'data-name': this.name
    //   }
    // }, childrenComponents)
  }
}

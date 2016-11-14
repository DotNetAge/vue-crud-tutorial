import Field from './field'
import FieldVal from './fieldval'

export default {
  name: 'DataTable',
  props: {
    dataItems: {
      type: Array,
      default: []
    },
    dataFields: {
      type: Array,
      default: []
    },
    keyField: {
      type: String,
      default: 'id'
    },
    autoGenerate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sortingKey: '',
      direction: '',
      fields: {}
    }
  },
  beforeMount () {
    let _fields = this.$slots.default.filter(node =>
      node.componentOptions && node.componentOptions.tag === 'field'
    )
    let self = this
    _fields.forEach(f => {
      self.fields[f.componentOptions.propsData.name] = f
    })
  },
  render (createElement) {
    let _fs = this.fields

    let cellNodes = item => this.dataFields.map(df => {

      if (_fs[df.name]) {
        // console.log(df.name)
        // debugger

        let vnode = _fs[df.name]
        let cloned = new VNode(
          vnode.tag,
          vnode.data,
          vnode.children,
          vnode.text,
          vnode.elm,
          vnode.ns,
          vnode.context,
          vnode.componentOptions
        )
        // newNode.componentOptions.propsData.item = item
        cloned.isStatic = vnode.isStatic
        cloned.key = vnode.key
        cloned.isCloned = true
        cloned.componentOptions.propsData.item = item
        return cloned
        // _fs[df.name].componentOptions.propsData.item = item
        // return _fs[df.name]
      }
      else {
        // let Ctor = Vue.extend(Field)
        // return new Ctor({propsData: {name: df.name, item: item}})
        return createElement(Field, {props: {name: df.name, item: item}})
      }
    })
    let rowNodes = this.dataItems.map(item => createElement('tr', {}, cellNodes(item)))
    return createElement('table', {}, rowNodes)
  },
  methods: {
    sorted (fieldName) {
      return true
    },
    sortBy (fieldName) {
    }
  },
  components: {Field, FieldVal}
}


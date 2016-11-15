import _ from 'lodash'
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
    if (this.$slots.default) {
      let _fields = this.$slots.default.filter(node => node.tag === 'field')
      let self = this
      _fields.forEach(f => {
        self.fields[f.data.attrs.name] = f
      })
    }
  },
  methods: {
    sorted (key) {
      return key === this.sortingKey
    },
    sortBy (key) {
      if (key === this.sortingKey) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc'
      }
      this.sortingKey = key
      this.$emit('sort', {
        field: key,
        dir: this.direction
      })
    },
    selectChanged (item, e) {
      item.selected = e.target.checked
      if (e.target.checked) {
        this.selection.push(item[this.keyField])
        this.selection = _.uniq(this.selection)
      } else {
        this.selection = _.reject(this.selection, b => item[this.keyField] === b)
      }

      this.$emit('selection-changed', {
        selection: this.selection,
        item: item
      })
    },
  },
  render (createElement) {
    let _fs = this.fields

    // 显示排序标记
    const sortFlag = header => createElement('span', {
      class: {
        'hidden': this.sortingKey !== header.name,
        'uk-icon-sort-asc': this.direction === 'asc',
        'ui-icon-sort-desc': this.direction === 'desc'
      }
    })

    // 绘制表头
    const colHeader = (header, index) => {
      var dataOpts = {
        class: {
          'uk-text-center': true,
          'disable-select': true,
          'sorting': this.sorted(header.name)
        },
        on: {
          click: () => this.sortBy(header.name)
        }
      }

      if (index === 0) {
        dataOpts = _.extend({}, dataOpts, {
          attrs: {
            colspan: 2
          }
        })
      }

      return createElement('th', dataOpts, [createElement('div', {
        domProps: {
          innerHTML: header.title
        }
      }, [sortFlag(header)])])
    }

    const toolCellNode = item => createElement('td', [createElement('input', {
      domProps: {
        type: 'checkbox'
      },
      attrs: {
        'data-id': item[this.keyField]
      },
      on: {
        change: e => this.selectionChanged(item, e)
      }
    })])

    // 绘制单元格
    const cellNodes = item => [toolCellNode(item)].concat(this.dataFields.map(df => {

      if (_fs[df.name]) {
        // 动态装配组件
        return createElement(_.extend({},
          _fs[df.name].data.inlineTemplate, {
            name: 'CustomField',
            props: ['name', 'item']
          }), {props: {name: df.name, item: item}})
      }
      else {
        // let Ctor = Vue.extend(Field)
        // return new Ctor({propsData: {name: df.name, item: item}})
        return createElement('td', {}, [createElement('div', {
          class: {
            'fill': true,
            'sorting': this.sorted(df.name)
          },
          domProps: {
            innerHTML: item[df.name]
          }
        })])
      }
    }))

    // 绘制行对象
    const rowNodes = this.dataItems.map(item => createElement('tr', {}, cellNodes(item)))

    return createElement('table', {
      class: {
        'uk-table': true,
        'uk-table-striped': true
      }
    }, [
      createElement('thead', [createElement('tr', {}, this.dataFields.map(colHeader))]),
      createElement('tbody', [rowNodes])
    ])

  },
  components: {
    Field: {
      name: 'Field',
      props: ['name', 'item'],
      render: h => createElement('span')
    }
  }
}


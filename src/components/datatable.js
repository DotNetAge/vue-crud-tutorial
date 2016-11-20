import _ from 'lodash'
import Vue from 'vue'
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
    }
  },
  render (h) {
    return <table class={{
        'uk-table': true,
        'uk-table-striped': true
      }}>
        <thead>
        <tr>
          {
            this.dataFields.map((header, index) => (
                <th class={{
                  'uk-text-center': true,
                  'disable-select': true,
                  'sorting': this.sorted(header.name)
                }}
                    colSpan={index === 0 ? 2 : 1}
                    on-click={ (header) => this.sortBy(header.name) }>
                  <div>
                    { header.title }
                    <span class={{
                      'hidden': this.sortingKey !== header.name,
                      'uk-icon-sort-asc': this.direction === 'asc',
                      'ui-icon-sort-desc': this.direction === 'desc'
                    }}>
                    </span>
                  </div>
                </th>
              )
            )
          }
        </tr>
        </thead>
        <tbody>
        {
          this.dataItems.map(item => (
            <tr>
              <td>
                <input type="checkbox"
                       data-id={item[this.keyField]}
                       on-change={($event) => this.selectionChanged(item, $event)}/>
              </td>
              {
                this.dataFields.map(df => (
                  <td>

                    <div class={{
                      'fill': true,
                      'sorting': this.sorted(df.name)
                    }} on-click={ () => this.$emit('cell-click', propsData) }>
                      {
                        this.fields[df.name] ? h(Vue.extend(_.extend(this.fields[df.name].data.inlineTemplate, {
                          name: 'CustomField',
                          props: ['name', 'item']
                        })), {
                          props: {
                            name: df.name,
                            item: item
                          }
                        }) : item[df.name]
                      }
                    </div>
                  </td>
                ))
              }
            </tr>
          ))
        }
        </tbody>
      </table>

  },
  components: {
    Field: {
      name: 'Field',
      props: ['name', 'item'],
      render: h => h('span')
    }
  }
}


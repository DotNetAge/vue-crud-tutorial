import Vue from 'vue'
import DataTable from 'components/datatable'
import Field from 'components/field'
import FieldVal from 'components/fieldval'

describe('datatable', () => {
  it('应该正确输出列', () => {
    let data = {
      items: [
        {id: 1, title: 'ABCDEFG', price: 29.0, tag: 'kkk'},
        {id: 2, title: 'asdfasdf', price: 19.0, tag: 'ee'},
        {id: 3, title: 'wuyturty', price: 24.0, tag: 'bbb'},
        {id: 4, title: 'ABCDasdfasdfEFG', price: 2, tag: 'cc'},
        {id: 5, title: 'ABCDwqerwEFG', price: 59.0, tag: 'kkk'},
        {id: 6, title: 'tryutryur', price: 27.0, tag: 'aa'},
        {id: 7, title: 'ABCrtuturtyDEFG', price: 9.0, tag: 'ee'}
      ]
    }
    // '[Vue warn]: You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
    let TestHolder = Vue.extend({
      template: `<div><data-table :data-items="items"
                      :data-fields="[
                        {name: 'title', title: '标题'},
                        {name: 'price', title: '价格'},
                        {name: 'tag', title: '标签'}
                      ]">
            <field name="title"><a>
                <field-val name="title"></field-val></a>
                <field-val name="tag"></field-val>
            </field>
          </data-table></div>`,
      components: {DataTable, Field, FieldVal}
    })

    let vm = new TestHolder({
      el: document.createElement('div'),
      data: data
    })

    console.log(vm.$el)
  })
})


import DataTable from 'components/datatable'
import Field from 'components/field'
import {getVM} from '../helpers'
import Vue from 'vue'
import BooksData from 'src/fixtures/items.json'
describe('datatable', () => {
  it('应该正确输出列', () => {
    // '[Vue warn]: You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

    let fields = [
      {name: 'name', title: '书名'},
      {name: 'category', title: '分类'},
      {name: 'published', title: '发布日期'}
    ]

    let TestHolder = Vue.extend({
      template: `<div><data-table :data-items="items"
                      :data-fields="fields">
            <field name="name" inline-template>
               <div>
                  <a href="javascript:void(0);">
                     {{ item.name }}
                  </a>
                  <p>
                    {{ item.isbn }}
                  </p>
                </div>
            </field>
          </data-table></div>`,
      components: {DataTable, Field}
    })

    let vm = new TestHolder({
      el: document.createElement('div'),
      data: {
        items: BooksData,
        fields: fields
      }
    })

    // let vm = getVM(h => (<div>
    //   <data-table data-items={BooksData}
    //               data-fields={fields}>
    //     <field name="name">
    //       <a href="javascript:void(0);">
    //         <field-val name="name">
    //         </field-val>
    //       </a>
    //       <p>
    //         <field-val name="isbn">
    //         </field-val>
    //       </p>
    //     </field>
    //     <field name="category" class="small">
    //     </field>
    //     <field name="published" class="published">
    //     </field>
    //   </data-table>
    // </div>), {DataTable, Field, FieldVal})

    console.log(vm.$el)
  })
})


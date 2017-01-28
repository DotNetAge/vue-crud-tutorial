import DataTable from 'components/datatable'
import Vue from 'vue'
import BooksData from 'src/fixtures/items.json'
import _ from 'lodash'

let fields = [
  {name: 'name', title: '书名'},
  {name: 'category', title: '分类'},
  {name: 'published', title: '发布日期'}
]

const compileComponent = (tmpl, exts) => {
  let defaults = {
    template: tmpl,
    components: {DataTable}
  }

  let TestHolder = Vue.extend(exts ? _.extend(defaults, exts) : defaults)

  return new TestHolder({
    el: document.createElement('div'),
    data: {
      items: BooksData,
      fields: fields
    }
  }).$mount()
}

describe('datatable', () => {
  xit('应该自动根据输入数据行与列定义输出表结构', () => {
    let vm = compileComponent(`<div>
          <data-table :data-items="items"
                      :data-fields="fields">
          </data-table></div>`)
    expect(vm.$el.querySelectorAll('tbody>tr').length).to.eqls(BooksData.length)
    expect(vm.$el.querySelectorAll('thead>tr>th').length).to.eqls(3)
  })

  xit('应该正确输出自定义列并触发排序和行选事件', () => {
    // '[Vue warn]: You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
    // 代表性意义:
    // 1. 模板的外置
    // 2. 动态组件与 inline-template
    // 3. Render 方法
    let sortHandler = sinon.spy()
    let selectionChangeHandler = sinon.spy()
    let linkHandler = sinon.spy()
    let vm = compileComponent(`<div>
          <data-table :data-items="items"
                      :data-fields="fields"
                      @sort = "sortHandler"
                      @selection-change="selectionChangeHandler"
                      @cell-click="linkHandler">
            <field name="name" inline-template>
               <div>
                  <a>
                     {{ item.name }}
                  </a>
                  <p>
                    {{ item.isbn }}
                  </p>
                </div>
            </field>
          </data-table></div>`, {
            methods: {
              linkHandler,
              sortHandler,
              selectionChangeHandler
            }
          })
    // console.log(vm.$el)
    expect(vm.$el.querySelectorAll('tbody>tr').length).to.eqls(BooksData.length)
    expect(vm.$el.querySelectorAll('thead>tr>th').length).to.eqls(3)
    expect(vm.$el.querySelectorAll('a').length).to.eqls(BooksData.length)
    // window.$(vm.$el.querySelectorAll('.custom-cell')[0]).trigger('click')
    window.$(vm.$el.querySelectorAll('thead>tr>th')[1]).trigger('click')
    // window.$(vm.$el.querySelectorAll('tbody>tr:first>td>input')).trigger('click')
    expect(sortHandler).to.have.been.called
    // expect(linkHandler).to.have.been.called
    // expect(selectionChangeHandler).to.have.been.called
  })
})

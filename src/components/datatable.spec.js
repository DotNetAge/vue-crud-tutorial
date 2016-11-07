import Vue from 'vue'
import DataTable from './datatable'

describe('datatable', ()=> {

    it('应该正确输出列', ()=> {
        const vm = new Vue({
            el: document.createElement('div'),
            components: {DataTable},
            render (h) {
                const _columns = [
                    {text: '书名', sortable: true, name: 'name'},
                    {text: '类别', sortable: true, name: 'category'},
                    {text: '出版日期', sortable: true, name: 'published'}
                ]

                return (
                    <div>
                        <data-table columns={ _columns }>
                           
                        </data-table>
                    </div>
                )
            }
        }).$mount()

        console.log(vm.$el)
    })
});

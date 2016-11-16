import Vue from 'vue'
// import VueValidator from 'vue-validator'
// Vue.use(VueValidator)

import {getVM} from '../helpers'
import BookEditForm from 'components/book-editform.vue'
import FormField from 'components/form-field'

describe('book-editform', () => {
  it('应该正确输出formfield的HTML结构', ()=> {
    let vm = getVM(h => (
      <div>
        <form-field label="Name" name="name">
          <input name="name"/>
        </form-field>
      </div>
    ), {FormField})
    expect(vm.$el.querySelector('label').textContent).to.eqls('Name')
    expect(vm.$el.querySelector('label').getAttribute('for')).to.eqls('name')
  })

  // it('应该显示表单验证结果', () => {
  //   let Ctor = Vue.extend({
  //     methods: {
  //       handleValidate (e){
  //         let validity = e.target.$validity
  //         validity.validate()
  //       }
  //     },
  //     template: `<div>
  //         <validity field="username"
  //         :validators="{ required: true, minlength: 4 }">
  //           <input type="text" @input="handleValidate" @focusout="handleValidate">
  //         </validity>
  //       </div>
  //     `
  //   })
  //   let vm = new Ctor({
  //     el: document.createElement('div')
  //   })
  //   console.log(vm.$el)
  // })

  xit('应该正确验证表单', () => {
    let vm = getVM(h => (<book-edit-form>
    </book-edit-form>), {BookEditForm})
    console.log(vm.$el)
    window.$(vm.$el).trigger('submit')
  })
})


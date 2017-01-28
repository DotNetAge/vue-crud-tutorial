import Vue from 'vue'
import BookEditForm from 'components/book-editform.vue'
import FormField from 'components/form-field'
import messages from 'src/vee-local-fixed'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  locale: 'zh_CN',
  dictionary: {
    zh_CN: {messages}
  }
})

describe('FormField', () => {
  it('#mount', () => {
    let vm = new Vue({
      el: document.createElement('div'),
      render(h) {
        return <div>
          <form-field label="名称"
                      name="name"
                      rules="require"
                      value="Ray">
          </form-field>
        </div>
      },
      components: {FormField}
    }).$mount()

    expect(vm.$el.querySelector('label').textContent).to.eqls('名称')
    expect(vm.$el.querySelector('label').getAttribute('for')).to.eqls('name')
    expect(vm.$el.querySelector('input').value).to.eqls('Ray')

  })

  //
  // xit('应该正确验证表单', () => {
  //   let vm = getVM(h => (<book-edit-form>
  //   </book-edit-form>), {BookEditForm})
  //   console.log(vm.$el)
  //   window.$(vm.$el).trigger('submit')
  // })
})


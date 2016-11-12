import {getVM} from '../helpers'
import BookEditForm from '../../../src/components/book-editform.vue'

describe('book-editform', () => {
  it('应该正确验证表单', () => {

    let vm = getVM(h => (<book-edit-form>
    </book-edit-form>), {BookEditForm})

    window.$(vm.$el).trigger('submit')

  })
})

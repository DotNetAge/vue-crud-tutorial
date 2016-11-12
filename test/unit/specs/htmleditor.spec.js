import UIKit from '../../../src/vue-uikit'
import Vue from 'vue'
import HtmlEditor from '../../../src/components/htmleditor'
import {getVM} from '../helpers'
import 'chance'
Vue.use(UIKit)

describe('htmleditor', () => {
  it('应该在内容修该时出发change 事件', () => {
    let valueChangedHandler = sinon.spy()
    let editingContent = chance.paragraph()

    let vm = getVM(h => (<html-editor value={editingContent}
                                      on-change={valueChangedHandler}>

    </html-editor>), {HtmlEditor})

    let textarea = window.$(vm.$el.querySelector('textarea'))
    // textarea.value = editingContent

    // TODO:Change value via editor

    textarea.trigger('input')

    // expect
    expect(valueChangedHandler).to.have.been.called

  })
})


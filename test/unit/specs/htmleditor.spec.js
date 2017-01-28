import UIKit from 'src/vue-uikit'
import Vue from 'vue'
import HtmlEditor from 'components/htmleditor'
import {getVM} from '../helpers'
// import 'chance'
Vue.use(UIKit)

describe('htmleditor', () => {

  xit('应该在内容修时出发 change 事件', () => {
    const valueChangedHandler = sinon.spy()
    const originalContent = Chance().paragraph()
    const editingContent = Chance().paragraph()

    let vm = getVM(h => (<html-editor value={originalContent}
                                      on-change={valueChangedHandler}>

    </html-editor>), {HtmlEditor})
    let editor = vm.$children[0]
    // 取得HtmlEditor生成的textarea原素
    let textarea = editor.$el.querySelector('textarea')

    expect(textarea.textContent).to.eqls(originalContent)

    editor.value = editingContent

    // 触发数据输入事件
    $(textarea).trigger('input')

    expect(valueChangedHandler).to.have.been.called
  })
})


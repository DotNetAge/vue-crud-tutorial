import UiButton from 'components/button'
import {getVM} from '../helpers'
import _ from 'lodash'

describe('button', () => {
  it('应该输出UIKit Button的网页样式', () => {
    let vm = getVM(h => (
      <ui-button icon="disk"
                 text="保存">
      </ui-button>
    ), {UiButton})
    expect(_.trim(vm.$el.textContent)).to.eqls('保存')
  })
})

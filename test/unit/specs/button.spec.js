import UkButton from 'components/button'
import {getVM} from '../helpers'
import _ from 'lodash'

describe('button', () => {
  it('应该输出UIKit Button的网页样式', () => {
    let vm = getVM(h => (
      <uk-button icon="disk">
        保存
      </uk-button>
    ), {UkButton})
    expect(_.trim(vm.$el.textContent)).to.eqls('保存')
  })
})

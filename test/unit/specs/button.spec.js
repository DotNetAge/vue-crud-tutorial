import UkButton from 'components/button'
import {getVM} from '../helpers'
import _ from 'lodash'

describe('button', () => {
  it('$mount', () => {
    let vm = getVM(h => (
      <uk-button icon="disk">
        保存
      </uk-button>
    ), {UkButton})
    expect(_.trim(vm.$el.textContent)).to.eqls('保存')
  })
})

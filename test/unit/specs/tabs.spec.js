import {Tabs, Tab} from 'components/tabs'
import {getVM} from '../helpers'

describe('tabs', () => {
  it('应该输出tab内容页所需的网页结构', () => {
    let vm = getVM(h => (<ul>
      <tab label="通用">
        <div class="tab-content"></div>
      </tab>
      <tab label="摘要">
        <div class="tab-content">ABCDEFG</div>
      </tab>
    </ul>), {Tab})

    // console.log(vm.$el)
    expect(vm.$el.querySelectorAll('li').length).to.equal(2)
    expect(vm.$el.querySelectorAll('.tab-content').length).to.equal(2)
  })

  it('应该输出tabs的正确结构', () => {
    let vm = getVM(h => (<tabs>
      <tab label="通用">
        <div class="tab-content"></div>
      </tab>
      <tab label="摘要">
        <div class="tab-content"></div>
      </tab>
    </tabs>), {Tabs, Tab})

    expect(vm.$el.querySelectorAll('ul').length).to.equal(2)
    expect(vm.$el.querySelectorAll('a').length).to.equal(2)
    expect(vm.$el.querySelectorAll('.tab-content').length).to.equal(2)
  })
})


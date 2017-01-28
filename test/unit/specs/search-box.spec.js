import SearchBox from 'components/search-box'
import {getVM} from '../helpers'

describe('search-box', () => {
  xit('#search', () => {
    let searchHandler = sinon.spy()
    const searchTerm = Chance().word()
    let vm = getVM(h => <search-box on-search={ searchHandler }>
      </search-box>
      , {SearchBox})

    let input = vm.$el.querySelector('input')
    expect(input).to.be.exist
    $(input).val(searchTerm)

    let e = $.Event('keyup')
    e.which = 13
    $(input).trigger(e)

    expect(searchHandler).to.have.been.calledOnce
    expect(searchHandler.firstCall.args[0]).to.eqls(searchTerm)
  })
})


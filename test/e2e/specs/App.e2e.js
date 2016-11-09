// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  '图书记录多选测试': function (browser) {
    const devServer = browser.globals.devServerURL

    browser.url(devServer).waitForElementVisible('#app', 500)
    // .assert.elementPresent('#app')
    // .assert.elementPresent('.cb-book:first')
    // .element('tbody tr:first input[type=\"checkbox\"]')
    // .click()
    // .assert.visible('#btn-delete') //开始没有设置ID,通过测试我们知道每个元素应该被正确地标记
    // .element('tbody tr:first input[type=\"checkbox\"]')
    // .click()
    // .assert.visible('#btn-delete')
    // .element('tbody tr:first input[type=\"checkbox\"]')
    // .click()
    // .assert.visible('#btn-delete')
    // .element('tbody tr:first input[type=\"checkbox\"]')
    // .click()
    // .assert.hidden('#btn-delete')

    browser.assert.elementPresent('css selector', '.cb-book')
    // console.log(checkBoxs.length)
    browser.end()
  }
}


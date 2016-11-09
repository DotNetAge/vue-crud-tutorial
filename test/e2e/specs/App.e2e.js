// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage


module.exports = {

  'default e2e tests': function (browser) {

    const devServer = browser.globals.devServerURL
    debugger
    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.logo')
      .assert.containsText('h1', 'Hello Vue!')
      .assert.elementCount('p', 3)
      .end()
  }

}

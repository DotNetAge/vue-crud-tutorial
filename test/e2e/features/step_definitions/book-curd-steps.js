export default function () {

  this.Given(/^我打开'\/'进入图书管理页面$/, client => {
    const devServer = client.globals.devServerURL
    client.url(devServer).waitForElementVisible('#app', 5000)
  })


  this.When(/^我在搜索框内输入"([^"]*)"$/, (client, terms) => {
    client.setValue('input[type="search"]', [terms, client.Keys.Enter])
  })

  this.Then(/^我应该只看到标题含有"([^"]*)"的所有图书$/, (client, terms) => {
    debugger
    client.assert.visible(`a[title~="${terms}"]`)
          .assert.hidden(`:not(a[title~="${terms}"])`)
  })

}

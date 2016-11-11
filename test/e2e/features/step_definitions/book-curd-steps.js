export default function () {

  this.Given(/^我打开'\/'进入图书管理页面$/, client => {
    const url = client.globals.rootURL
    client.url(url).waitForElementVisible('#app', 3000)
  })


  this.When(/^我在搜索框内输入"([^"]*)"$/, (client, terms) => {
    //client.page.bookView().search(terms) // 变得极慢且会超时
    client.setValue('input[type="search"]', [terms, client.Keys.Enter])
  })

  this.Then(/^我应该只看到标题含有"([^"]*)"的所有图书$/, (client, terms) => {
    client.assert.elementPresent(`a[title*="${terms}"]`)
      .assert.elementNotPresent(`:not(a[title*="${terms}"])`)
  })

  this.When(/^我选中isbn为"([^"]*)"图书的勾选框$/, (client, isbn) => {
    client.click(`input[data-isbn="${isbn}"]`)
  })

  this.Then(/^我应该看到右上方出现一个删除按钮$/, (client)=> {
    client.assert.elementPresent('#btn-delete')
  })


  this.Then(/^我应该看到右上方没有删除按钮$/, (client)=> {
    client.assert.elementNotPresent('#btn-delete')
  })
}

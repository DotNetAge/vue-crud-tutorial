export default function () {

  this.Given(/^我打开'\/'进入图书管理页面$/, client => {
    const devServer = client.globals.devServerURL

    // callback.pending()
    client.url(devServer)
      .waitForElementVisible('#app', 500)
  })

  this.When(/^我在搜索框内输入"([^"]*)"$/, (terms, client) => {
    debugger
    client.pending()
  })

  this.Then(/^我应该看到在图书列出中显示以下的数据$/, client => {
    client.pending()
  })

}

describe('图书管理视图', () => {

  it('应该筛选与搜索框输入匹配的图书数据', (client) => {
    const terms = '大数据'
    client.url(client.launchUrl)
      .waitForElementVisible('body', 30000) // 此处的延时可以设置得长一些，否则Webpack未编译成功就发送请求而会导致失败
      .setValue('input[type="search"]', [terms, client.Keys.ENTER])
      .assert.containsText('.book-name', terms)
      .setValue('input[type="search"]', ['不存在的数据', client.Keys.ENTER])
      .assert.elementPresent('.empty-holder')
      .end()
  })

  it('多行数据选定时应该显示删除按钮、显示选中的数量以及选中的样式', client => {
    const isbns = ['978-7-121-28410-6', '978-7-121-28817-3', '978-7-121-28413-7'] //对Element的定位很重要，这里只能是个体

    client.url(client.launchUrl)
      .waitForElementVisible('body', 30000)
      .assert.elementNotPresent('.selection')
      .assert.elementNotPresent('#btn-delete')
      .assert.cssClassNotPresent(`tr[data-isbn="${isbns[0]}"]`, 'book-selected')
      .assert.cssClassNotPresent(`tr[data-isbn="${isbns[1]}"]`, 'book-selected')
      .assert.cssClassNotPresent(`tr[data-isbn="${isbns[2]}"]`, 'book-selected')
      .click(`input[type="checkbox"][data-isbn="${isbns[0]}"]`)
      .click(`input[type="checkbox"][data-isbn="${isbns[1]}"]`)
      .click(`input[type="checkbox"][data-isbn="${isbns[2]}"]`)
      .assert.containsText('.selection', '3')
      .assert.elementPresent('#btn-delete')
      .assert.cssClassPresent(`tr[data-isbn="${isbns[0]}"]`, 'book-selected')
      .assert.cssClassPresent(`tr[data-isbn="${isbns[1]}"]`, 'book-selected')
      .assert.cssClassPresent(`tr[data-isbn="${isbns[2]}"]`, 'book-selected')
      .end()
  })


  it('点击列头时应该进行排序', client => {
    const colName = 'th[data-col="name"]'
    const colCat = 'th[data-col="category"]'
    const colPub = 'th[data-col="published"]'
    const sortingClass = 'sorting'
    const asc = 'div>span.uk-icon-sort-asc'
    const desc = 'div>span.uk-icon-sort-desc'

    client.url(client.launchUrl)
      .waitForElementVisible('body', 30000)
      .assert.cssClassNotPresent(colName, sortingClass)
      .assert.cssClassNotPresent(colCat, sortingClass)
      .assert.cssClassNotPresent(colPub, sortingClass)
      .assert.elementNotPresent(`${colName}>div>span`)
      .assert.elementNotPresent(`${colCat}>div>span`)
      .assert.elementNotPresent(`${colPub}>div>span`)
      .getAttribute('#app tbody>tr:first', 'data-isbn', result => {
        this.assert.equal(result.value, '978-7-121-28410-6') // 无排序
      })
      .click(colName) // 对名称进行排序
      .assert.elementPresent(`${colName}>${asc}`)
      .getAttribute('tbody>tr:first', 'data-isbn', result => {
        this.assert.equal(result.value, '978-7-121-28413-7') // 升序
      })
      .click(colName) // 反向排序
      .getAttribute('tbody>tr:first', 'data-isbn', result => {
        this.assert.equal(result.value, '978-7-121-28381-9') //降序
      })
      .assert.elementPresent(`${colName}>${desc}`)
      .assert.cssClassPresent(colName, sortingClass)
      .assert.cssClassNotPresent(colCat, sortingClass)
      .assert.cssClassNotPresent(colPub, sortingClass)
      .click(colCat) // 对类别进行排序
      .assert.elementPresent(`${colCat}>${asc}`)
      .assert.cssClassPresent(colCat, sortingClass)
      .assert.cssClassNotPresent(colName, sortingClass)
      .assert.cssClassNotPresent(colPub, sortingClass)
      .end()
  })
})


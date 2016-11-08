<template>
  <div id="app">
    <div class="uk-block uk-block-primary uk-contrast page-header">
      <div class="uk-container-center">
        <h1 class="uk-heading-large">图书
          <small>Vue CRUD 示例</small>
        </h1>
      </div>
    </div>
    <div class="content">
      <div class="uk-grid uk-margin-large-bottom">
        <div class="uk-width-3-4">
          <div class="uk-grid">
            <div class="uk-width-1-3">
                            <span class="uk-text-large uk-text-muted">共有<span
                              class="uk-text-bold">{{ bookFilter.length }}</span>本图书</span></div>
            <div class="uk-width-2-3">
              <div class="uk-form">
                <div class="uk-form-icon">
                  <i class="uk-icon-search"></i>
                  <input type="search"
                         class="search-box uk-form-width-large"
                         placeholder="请输入您要筛选的书名"
                         @key.enter="filterByBookName"
                         v-model="terms"/></div>
              </div>
            </div>
          </div>
        </div>
        <div class="uk-width-1-4">
          <div class="uk-float-right">
            <button title="删除已选中的图书"
                    class="uk-button uk-button-danger"
                    @click="removeBooks"
                    id="btn-delete"
                    v-if="hasSelection"
            ><i class="uk-icon-trash"></i>
            </button>

            <button class="uk-button uk-button-primary"
                    @click.prevent="newBook">
              <i class="uk-icon-plus"></i> <span>添加</span>
            </button>
          </div>
        </div>
      </div>
      <table class="uk-table uk-table-striped">
        <thead>
        <tr>
          <th class="uk-text-center disable-select"
              @click="sortBy('name')">书名
                        <span :class="{
                            'uk-icon-sort-asc': direction=='asc',
                            'uk-icon-sort-desc': direction=='desc'
                        }" v-if="sortingKey=='name'"></span>
          </th>
          <th class="uk-text-center uk-width-1-6 disable-select"
              @click="sortBy('category')">类别
                        <span :class="{
                            'uk-icon-sort-asc': direction=='asc',
                            'uk-icon-sort-desc': direction=='desc'
                        }" v-if="sortingKey=='category'"></span>
          </th>
          <th class="uk-text-center uk-width-1-6 disable-select"
              @click="sortBy('published')">出版日期
                        <span :class="{
                            'uk-icon-sort-asc': direction=='asc',
                            'uk-icon-sort-desc': direction=='desc'
                        }" v-if="sortingKey=='published'"></span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in bookFilter" :data-isbn="book.isbn">
          <td class="book-name uk-form uk-grid">
            <div class="uk-width-1-10">
              <input type="checkbox"
                     @change="selectChanged(book,$event)"
                     class="uk-margin-right cb-book"/>
            </div>
            <div class="uk-width-9-10">
              <a class="uk-h3"
                 href="javascript:void(0)"
                 :title="book.name"
                 @click.prevent="editBook(book)">{{ book.name }}</a>
              <p class="authors uk-text-muted uk-text-small">{{ book.authors | join }}</p>
            </div>
          </td>
          <td class="small">{{ book.category }}</td>
          <td class="published uk-text-center">{{ book.published }}</td>
        </tr>
        </tbody>
      </table>
      <modal ref="modal"
             :headerText="statusText"
             @dialogClose="current=undefined">
        <form class="uk-form uk-form-horizontal"
              v-if="current">
          <div class="uk-container uk-container-center">
            <ul class="uk-tab" data-uk-tab="{active:0,connect:'#tabContents'}">
              <li><a href="">通用</a></li>
              <li><a href="">摘要</a></li>
            </ul>
            <ul class="uk-switcher uk-margin" id="tabContents">
              <li>
                <div class="uk-form-row">
                  <label class="uk-form-label"
                         for="book-name-field">书名</label>
                  <div class="uk-form-controls">
                    <input id="book-name-field"
                           class="uk-form-width-large"
                           autofocus="autofocus"
                           v-model="current.name"/>
                  </div>
                </div>
                <div class="uk-form-row">
                  <label class="uk-form-label"
                         for="book-isbn-field">书号</label>
                  <div class="uk-form-controls">
                    <input id="book-isbn-field"
                           class="uk-form-width-large"
                           v-model="current.isbn"/>
                  </div>
                </div>
                <div class="uk-form-row">
                  <label class="uk-form-label"
                         for="book-price-field">售价</label>
                  <div class="uk-form-controls">
                    <input id="book-price-field"
                           class="uk-form-width-large"
                           type="number"
                           min="0.0"
                           step="any"
                           v-model="current.price"/>
                  </div>
                </div>
                <div class="uk-form-row">
                  <label class="uk-form-label"
                         for="book-category-field">类别</label>
                  <div class="uk-form-controls">
                    <input id="book-category-field"
                           class="uk-form-width-large"
                           v-model="current.category"/>
                  </div>
                </div>
                <div class="uk-form-row">
                  <label class="uk-form-label"
                         for="book-published-field">出版日期</label>
                  <div class="uk-form-controls">
                    <input id="book-published-field"
                           class="uk-form-width-large"
                           v-model="current.published"
                           ref="published"
                    />
                  </div>
                </div>
                <div class="uk-form-row">
                  <label class="uk-form-label">&nbsp;</label>
                  <div class="uk-form-controls">
                    <label>
                      <input type="checkbox"
                             v-model="is_published"/> 上市销售
                    </label>
                  </div>
                </div>
                <div class="uk-form-row">
                  <label class="uk-form-label"
                         for="book-pages-field">页数</label>
                  <div class="uk-form-controls">
                    <input id="book-pages-field"
                           class="uk-form-width-large"
                           type="number"
                           min="100"
                           v-model="current.pages"/>
                  </div>
                </div>
                <div class="uk-form-row">
                  <label class="uk-form-label"
                         for="book-authors-field">作者</label>
                  <div class="uk-form-controls">
                    <input id="book-authors-field"
                           class="uk-form-width-large"
                           v-model="authors"/>
                  </div>
                </div>

              </li>
              <li>
                <html-editor :value="current.summary"
                             @change="current.summary = $event"></html-editor>

              </li>
            </ul>
          </div>
        </form>
        <div slot="footer"
             class="uk-modal-footer uk-text-right">
          <button class="uk-button uk-button-primary"
                  @click.prevent="save">保存
          </button>
          <button class="uk-button uk-button-danger"
                  @click.prevent="$refs.modal.close()">关闭
          </button>
        </div>
      </modal>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  import './assets/site.less'
  import BookData from './fixtures/items.json'
  import Modal from './components/dialog.vue'
  import HtmlEditor from './components/htmleditor'
  import _ from 'lodash'

  export default {
    data () {
      return {
        terms: '',
        sortingKey: '',
        direction: 'asc',
        current: undefined,
        statusText: '',
        books: BookData,
        selection: []
      }
    },
    created () {
      this.bookService = this.$resource('/api/books')
//            this.bookService.query({page: 1, size: 20}).then((res)=> {
//                this.books = res.body
//            }, (error)=> {
//                console.log(error)
//            })
    },
    mounted () {

      // console.log(this.$refs)
      // 在 Modal 内容纳的其它元素是无法用 ref 引用到的.
      // UIkit.datepicker(this.$refs.published)

    },
    computed: {
      is_published: {
        get () {
          return this.current.status === '上市销售'
        },
        set (val) {
          this.current.status = val ? '上市销售' : ''
        }
      },
      authors: {
        get () {
          return this.current.authors ? this.current.authors.join(',') : ''
        },
        set (val) {
          this.current.authors = val.split(',')
        }
      },
      bookFilter () {
        return this.terms.length ? this.books.filter(x => x.name.indexOf(this.terms) > -1) : this.books
      },
//            selectedBooks () {
//                return this.books.filter((book)=> this.selections.find((b)=>book.isbn == b.isbn) != undefined)
//            },
      hasSelection () {
        return this.selection.length > 0
      }
    },
    filters: {
      join (val) {
        return (val) ? val.join(',') : '无名氏'
      }
    },
    methods: {
      summaryChanged (e) {
        console.log(e)
      },
      filterByBookName () {
      },
      selectChanged (book, e) {
        // 将 book.selected 绑定到checkbox上而同时用change事件检测哪
        // 些 book.selected 为true 因为 `selected` 在book上是不存在的
        // 而正因此我们得到一个思路,可以为对象增加一些辅助属性
        if (e.target.checked) {
          this.selection.push(book.isbn)
          this.selection = _.uniq(this.selection)
        } else {
          this.selection = _.reject(this.selection, b => book.isbn === b.isbn)

          // 这是一个逻辑错误
          // this.selection = this.selection.filter((b)=> b.isbn == book.isbn)
        }
        console.log(this.selection)
      },
      newBook () {
        this.current = {}
        this.statusText = '添加新的图书'
        this.$refs.modal.open()
      },
      editBook (book) {
        // 与实例拖钩进行克隆
        this.current = _.extend({}, book)
        this.statusText = `编辑${book.name}`
        this.$refs.modal.open()
      },
      sortBy (key) {
        if (key === this.sortingKey) {
          this.direction = this.direction === 'asc' ? 'desc' : 'asc'
        }
        this.sortingKey = key
        this.books = _.orderBy(this.books, key, this.direction)
      },
      save () {
        console.log(this.current.summary)
        // this.books.push(this.current)
      },
      removeBooks (book) {
        // UIkit.modal.alert('真的要删除所选中的图书吗?');
        // this.books = this.books.filter(x =>x != book)
        this.$ui.alert('真的要删除所选中的图书吗?')
      }
    },
    components: {Modal, HtmlEditor}
  }
</script>

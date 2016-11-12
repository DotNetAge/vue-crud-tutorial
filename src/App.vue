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
            <div class="uk-width-2-4">
                            <span class="uk-text-large uk-text-muted">共有<span
                              class="uk-text-bold">{{ totalBooks }}</span>本图书
                            <span v-if="hasSelection">
                              &nbsp;已选中<span
                              class="uk-text-bold">{{ selection.length }}</span>本图书
                            </span>
                            </span>
            </div>
            <div class="uk-width-2-4">
              <div class="uk-form">
                <div class="uk-form-icon">
                  <i class="uk-icon-search"></i>
                  <input type="search"
                         class="search-box uk-form-width-large"
                         placeholder="请输入您要筛选的书名"
                         @keyup.enter="filterByBookName"
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
        <tr v-for="book in books" :data-isbn="book.isbn">
          <td class="uk-form uk-grid">
            <div class="uk-width-1-10">
              <input type="checkbox"
                     :data-isbn="book.isbn"
                     @change="selectChanged(book,$event)"
                     class="uk-margin-right cb-book"/>
            </div>
            <div class="uk-width-9-10">
              <a class="uk-h3 book-name"
                 href="javascript:void(0)"
                 :title="book.name"
                 data-uk-tooltip="{pos:'top'}"
                 @click.prevent="editBook(book)">{{ book.name }}</a>
              <p class="authors uk-text-muted uk-text-small">{{ book.authors | join }}</p>
            </div>
          </td>
          <td class="small">{{ book.category }}</td>
          <td class="published uk-text-center">{{ book.published }}</td>
        </tr>
        </tbody>
      </table>
      <div class="uk-margin-top uk-text-center">
        <pager v-if="totalBooks"
               :items="totalBooks"
               :size="pageSize"
               :current="currentPage"
               @pagechanged="pageChanged"></pager>
      </div>
      <modal ref="modal"
             :headerText="statusText"
             @dialogClose="current=undefined">
        <book-edit-form :book="current"
                        ref="form">
        </book-edit-form>
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
  // import BookData from './fixtures/items.json'
  import Modal from './components/dialog.vue'
  import './components/tooltips'
  import Pager from './components/pager'
  import BookEditForm from './components/book-editform.vue'
  import _ from 'lodash'

  export default {
    data () {
      return {
        terms: '',
        sortingKey: '',
        direction: 'asc',
        current: undefined,
        currentPage: 0, // page 是 0 Base 的
        totalBooks: 0,
        pageSize: 5,
        statusText: '',
        books: [],
        selection: []
      }
    },
    created () {
      this.bookService = this.$resource('/api/books')
      this.fetchBooks()
    },
    mounted () {
      // console.log(this.$refs)
      // 在 Modal 内容纳的其它元素是无法用 ref 引用到的.
      // UIkit.datepicker(this.$refs.published)
    },
    computed: {
      bookFilter () {
        return this.terms.length ? this.books.filter(x => x.name.indexOf(this.terms) > -1) : this.books
      },
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
        this.fetchBooks(1, this.terms)
      },
      pageChanged (pageIndex) {
        this.fetchBooks(pageIndex, this.terms)
      },
      fetchBooks (pageIndex = 1, filter = '') {
        return this.bookService.query({page: pageIndex, size: this.pageSize, filter: filter})
          .then((res) => {
            this.books = res.body.data
            this.totalBooks = res.body.total_records
          }, (error) => {
            console.log(error)
          })
      },
      refreshBooks () {
        return this.fetchBooks(this.currentPage, this.terms)
      },
      selectChanged (book, e) {
        // 将 book.selected 绑定到checkbox上而同时用change事件检测哪
        // 些 book.selected 为true 因为 `selected` 在book上是不存在的
        // 而正因此我们得到一个思路,可以为对象增加一些辅助属性

        if (e.target.checked) {
          this.selection.push(book.isbn)
          this.selection = _.uniq(this.selection)
        } else {
          this.selection = _.reject(this.selection, b => book.isbn === b)

          // 这是一个逻辑错误
          // this.selection = this.selection.filter((b)=> b.isbn == book.isbn)
        }
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
        // console.log(this.current.summary)
        // this.books.push(this.current)
        this.bookService.save(this.current)
        this.refreshBooks()
      },
      removeBooks () {
        // this.books = this.books.filter(x =>x != book)
        this.$ui.confirm('真的要删除所选中的图书吗?', () => {
          this.$http.delete('/api/books', {body: this.selection})
            .then((res) => {
              this.selection = []
              this.refreshBooks()
            })
        })
      }
    },
    components: {Modal, Pager, BookEditForm}
  }
</script>

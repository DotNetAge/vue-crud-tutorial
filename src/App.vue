<template>
  <div id="app">
    <view-page title="图书"
               sub-title="Vue CRUD 示例">
      <div slot="counting">
        <counting-status :total="totalBooks"
                         :selection="selection.length">
        </counting-status>
      </div>
      <div slot="search">
        <search-box :terms="terms"
                    placeholder="请输入您要筛选的书名"
                    @search="filterByBookName($event)"
        ></search-box>
      </div>
      <div slot="buttons">
        <uk-button id="btn-delete"
                   title="删除已选中的图书"
                   text=""
                   color="danger"
                   @click="removeBooks"
                   icon="trash"
                   v-if="hasSelection">
        </uk-button>
        <uk-button icon="plus"
                   text="添加"
                   color="primary"
                   @click="newBook"></uk-button>
      </div>
      <div slot="footer">
        <pager v-if="totalBooks"
               :items="totalBooks"
               :size="pageSize"
               :current="currentPage"
               @pagechanged="pageChanged"></pager>
      </div>
      <table class="uk-table uk-table-striped"
             v-if="totalBooks">
        <thead>
        <tr>
          <th class="uk-text-center disable-select"
              :class="{'sorting':sorted('name')}"
              data-col="name"
              @click="sortBy('name')">
            <div>书名
              <span :class="{
                            'uk-icon-sort-asc': direction=='asc',
                            'uk-icon-sort-desc': direction=='desc'
                        }" v-if="sortingKey=='name'"></span></div>
          </th>
          <th class="uk-text-center uk-width-1-6 disable-select"
              :class="{'sorting':sorted('category')}"
              data-col="category"
              @click="sortBy('category')">
            <div>类别
              <span :class="{
                            'uk-icon-sort-asc': direction=='asc',
                            'uk-icon-sort-desc': direction=='desc'
                        }" v-if="sortingKey=='category'"></span></div>
          </th>
          <th class="uk-text-center uk-width-1-6 disable-select"
              :class="{'sorting':sorted('published')}"
              data-col="published"
              @click="sortBy('published')">
            <div>出版日期
              <span :class="{
                            'uk-icon-sort-asc': direction=='asc',
                            'uk-icon-sort-desc': direction=='desc'
                        }" v-if="sortingKey=='published'"></span></div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in books"
            :class="{'book-selected': book.selected}"
            :data-isbn="book.isbn">
          <td class="uk-form">
            <div class="uk-grid" :class="{'sorting':sorted('name')}">
              <div class="uk-width-1-10">
                <input type="checkbox"
                       :data-isbn="book.isbn"
                       v-model="book.selected"
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
            </div>
          </td>
          <td class="small">
            <div class="fill" :class="{'sorting':sorted('category')}">{{ book.category }}</div>
          </td>
          <td class="published uk-text-center">
            <div class="fill" :class="{'sorting':sorted('published')}">{{ book.published }}</div>
          </td>
        </tr>
        </tbody>
      </table>
      <empty v-if="totalBooks==0"></empty>
      <modal ref="modal"
             :headerText="statusText"
             @dialogClose="current=undefined">
        <book-edit-form :book="current"
                        ref="form" v-if="current">
        </book-edit-form>

        <div slot="footer"
             class="uk-modal-footer uk-text-right">
          <uk-button color="primary"
                     @click="save">保存</uk-button>
          <uk-button color="danger"
                     @click="$refs.modal.close()">关闭</uk-button>
        </div>
      </modal>
    </view-page>
  </div>
</template>
<script type="text/ecmascript-6">
  import './assets/site.less'
  import Modal from './components/dialog.vue'
  import ViewPage from './components/viewpage.vue'
  import UkButton from './components/button'
  import './components/tooltips'
  import Pager from './components/pager'
  import BookEditForm from './components/book-editform.vue'
  import CountingStatus from './components/counting-status.vue'
  import SearchBox from './components/search-box.vue'
  import Empty from './components/empty-holder'
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
      sorted (key) {
        return key === this.sortingKey
      },
      filterByBookName (terms) {
        this.terms = terms
        this.fetchBooks(1, terms)
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
    components: {
      Modal,
      Pager,
      BookEditForm,
      CountingStatus,
      SearchBox,
      UkButton,
      Empty,
      ViewPage
    }
  }
</script>

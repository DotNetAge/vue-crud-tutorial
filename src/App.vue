<template>
    <div id="app">
        <h1>VUE CRUD</h1>
        <div>
            <input type="search"
                   class="search-box"
                   placeholder="请输入您要筛选的书名"
                   @key.enter="filterByBookName"
                   v-model="terms"/>
        </div>
        <div class="toolbar">
            <span class="stat">现在总共有{{ bookFilter.length }}本图书</span>
            <button @click.prevent="newBook">
                <span>添加</span>
            </button>
        </div>
        <table>
            <thead>
            <tr>
                <th @click="sortBy('name')">书名</th>
                <th @click="sortBy('category')">类别</th>
                <th @click="sortBy('published')">出版日期</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="book in bookFilter">
                <td class="book-name">
                    <a href="javascript:void(0)"
                       @click.prevent="editBook(book)">{{ book.name }}</a>
                    <span class="btn-del" @click="removeBook(book)">
                        <img src="./assets/delete.png">
                    </span>
                    <p class="authors">{{ book.authors | join }}</p>
                </td>
                <td class="small">{{ book.category }}</td>
                <td class="published">{{ book.published }}</td>
            </tr>
            </tbody>
        </table>
        <modal ref="modal"
               @dialogClose="current=undefined">
            <header slot="header">
                {{ statusText }}
            </header>
            <form v-if="current">
                <div>
                    <label>书名</label>
                    <input v-model="current.name"/>
                </div>
                <div>
                    <label>类别</label>
                    <input v-model="current.category"/>
                </div>
                <div>
                    <label>出版日期</label>
                    <input v-model="current.published"/>
                </div>
                <div>
                    <label>作者</label>
                    <input v-model="authors"/>
                </div>
            </form>
            <footer slot="footer">
                <button @click.prevent="save">保存</button>
                <button @click.prevent="$refs.modal.close()">关闭</button>
            </footer>
        </modal>
    </div>

</template>
<script type="text/ecmascript-6">
    import "./assets/app.less"
    import BookData from "./fixtures/items.json"
    import Modal from "./components/dialog.vue"
    import _ from "lodash"
    export default {
        data () {
            return {
                terms: "",
                sortingKey: "",
                direction :'asc',
                current: undefined,
                statusText: "",
                books: BookData
            }
        },
        created () {
            this.bookService = this.$resource('/api/books')
            this.bookService.query({page: 1, size: 20}).then((res)=> {
                this.books = res.body
            }, (error)=> {
                console.log(error)
            })
        },
        computed: {
            authors: {
                get (){
                    return this.current.authors ? this.current.authors.join(',') : ''
                },
                set (val){
                    this.current.authors = val.split(',')
                }
            },
            bookFilter () {
                if (this.terms.length)
                    return this.books.filter((x)=>x.name.indexOf(this.terms) > -1)
                else
                    return this.books
            }
        },
        filters: {
            join(val) {
                return (val) ? val.join(',') : '无名氏'
            }
        },
        methods: {
            filterByBookName() {
            },
            newBook () {
                this.current = {}
                this.statusText = "添加新的图书"
                this.$refs.modal.open()
            },
            editBook(book) {
                // 与实例拖钩进行克隆
                this.current = _.extend({}, book)
                this.statusText = `编辑${book.name}`
                this.$refs.modal.open()
            },
            sortBy(key) {
                if (key == this.sortingKey) {
                    if (this.direction == 'asc')
                        this.direction = 'desc'
                    else
                        this.direction = 'asc'
                }

                this.sortingKey = key

                //console.log(_.sortByOrder)
                this.books = _.orderBy(this.books, key, this.direction)
            },
            save() {
                this.books.push(this.current)
            },
            removeBook(book) {
                this.books = this.books.filter(x =>x != book)
            }
        },
        components: {Modal}
    }
</script>

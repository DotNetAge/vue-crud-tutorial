<template>
  <div id="app">
    <h1>VUE CRUD</h1>
    <div>
      <input type="text" 
             placeholder="请输入您要筛选的书名" 
             @key.enter = "filterByBookName"
             v-model="terms" />
    </div>
    <div class="toolbar">
      <button @click.prevent="newBook">
        <img scr=""> 
        <span>添加</span>
      </button>
    </div>
    <table>
      <tr>
        <th>书名</th>
        <th>作者</th>
        <th>类别</th>
        <th>出版日期</th>
      </tr>
      <tr v-for="book in books" >
        <th><a href="javascript:void(0)"
               @click.prevent="editBook" >{{ book.title }}</a>
        </th>
        <th>{{ book.authors | join }}</th>
        <th>{{ book.category }}</th>
        <th>{{ book.published | date }}</th>
      </tr>
    </table>
    <modal-dialog ref="modal">
      <div slot="header">{{ statusText }}</div>
      <form>
        <div><input ></div>
      </form>
      <div slot="footer">
        <button @click.prevent="save">保存</button>
        <button>关闭</button>
      </div>
    </modal-dialog>
  </div>

</template>
<script>
import "./assets/app.less"
import Modal from "./components/dialog"
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  data () {
    return {
       terms:"",
       statusText:"",
       books : []
    }
  },
  created () {

  },
  filters: {
     date(val) {
        return moment(val).calendar()
    },
    join(val) {
      return val.join(',')
    }
  },
  methods: {
    filterByBookName() {

    },
    newBook () {

    },
    editBook() {

    },
    save(){

    },
    removeBook() {
    }
  },
  components : { Modal }
}
</script>

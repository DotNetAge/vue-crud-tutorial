<template>
  <div>
      <form class="uk-form uk-form-horizontal" novalidate
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
                         v-model="current.isbn"
                         />
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
              <form-field label="类别"
                          name="book-category-field">
                <input id="book-category-field"
                       class="uk-form-width-large"
                       v-model="current.category"/>
              </form-field>

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
  </div>
</template>
<script type="text/ecmascript-6">
  import HtmlEditor from './htmleditor'
  import FormField from './form-field'
  export default {
    props: ['book'],
    data () {
      return {
        current: {}
      }
    },
    created () {
      this.reset()
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
      }
    },
    methods: {
      reset () {
        this.current = this.book ? this.book : {}
      }
    },
    components: {
      HtmlEditor, FormField
    }
  }
</script>

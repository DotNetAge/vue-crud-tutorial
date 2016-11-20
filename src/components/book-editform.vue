<template>
  <div>
    <form class="uk-form uk-form-horizontal"
          v-if="current">
      <div class="uk-container uk-container-center">
        <tabs>
          <tab label="通用">
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="name">书名</label>
              <div class="uk-form-controls">
                <input id="name"
                       name="name"
                       :class="{
                         'uk-form-width-large':true,
                         'uk-form-success':!errors.has('name'),
                         'uk-form-danger': errors.has('name')
                       }"
                       autofocus="autofocus"
                       @input="handleValidate"
                       v-validate
                       data-rules="required|name"
                       data-as="书名"
                       v-model="current.name"/>
                <small class="uk-text-danger" v-show="errors.has('name')">{{errors.first('name')}}</small>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="isbn">书号</label>
              <div class="uk-form-controls">
                <input id="isbn"
                       name="isbn"
                       :class="{
                         'uk-form-width-large':true,
                         'uk-form-success':!errors.has('isbn'),
                         'uk-form-danger': errors.has('isbn')
                       }"
                       v-validate
                       data-rules="required|isbn"
                       data-as="书号"
                       v-model="current.isbn"
                />
                <small class="uk-text-danger" v-show="errors.has('isbn')">{{errors.first('isbn')}}</small>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="price">售价</label>
              <div class="uk-form-controls">
                <input id="price"
                       name="price"
                       :class="{
                         'uk-form-width-large':true,
                         'uk-form-success':!errors.has('price'),
                         'uk-form-danger': errors.has('price')
                       }"
                       type="number"
                       v-validate
                       data-rules="required|numeric|min:0|price"
                       data-as="售价"
                       v-model="current.price"/>
                <small class="uk-text-danger" v-show="errors.has('price')">{{errors.first('price')}}</small>
              </div>
            </div>
            <form-field label="类别"
                        name="category">
              <input id="category"
                     name="category"
                     :class="{
                         'uk-form-width-large':true,
                         'uk-form-success':!errors.has('category'),
                         'uk-form-danger': errors.has('category')
                       }"
                     v-validate
                     data-rules="required|category"
                     data-as="类别"
                     v-model="current.category"/>
              <small class="uk-text-danger" v-show="errors.has('category')">{{errors.first('category')}}</small>
            </form-field>
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="published">出版日期</label>
              <div class="uk-form-controls">
                <input id="published"
                       type="date"
                       :class="{
                         'uk-form-width-large':true,
                         'uk-form-success':!errors.has('published'),
                         'uk-form-danger': errors.has('published')
                       }"
                       name="published"
                       v-model="current.published"
                       v-validate
                       placeholder="YYYY-MM-DD"
                       data-rules="date_format:YYYY-MM-DD|published"
                />
                <small class="uk-text-danger" v-show="errors.has('published')">{{errors.first('published')}}</small>
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
                     for="pages">页数</label>
              <div class="uk-form-controls">
                <input id="pages"
                       name="pages"
                       :class="{
                         'uk-form-width-large':true,
                         'uk-form-success':!errors.has('pages'),
                         'uk-form-danger': errors.has('pages')
                       }"
                       type="number"
                       step="any"
                       v-validate
                       data-rules="numeric|min:20|pages"
                       v-model="current.pages"/>
                <small class="uk-text-danger" v-show="errors.has('pages')">{{errors.first('pages')}}</small>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="authors">作者</label>
              <div class="uk-form-controls">
                <input id="authors"
                       name="authors"
                       :class="{
                         'uk-form-width-large':true,
                         'uk-form-success':!errors.has('authors'),
                         'uk-form-danger': errors.has('authors')
                       }"
                       v-validate
                       data-rules="required|authors"
                       v-model="authors"/>
                <small class="uk-text-danger" v-show="errors.has('authors')">{{errors.first('authors')}}</small>
              </div>
            </div>
          </tab>
          <tab label="摘要">
            <html-editor :value="current.summary"
                         @change="current.summary = $event"></html-editor>
          </tab>
        </tabs>
      </div>
    </form>
  </div>
</template>
<script type="text/ecmascript-6">
  import HtmlEditor from './htmleditor'
  import FormField from './form-field'
  import {Tab, Tabs} from './tabs'
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
      handleValidate () {
        this.$validator.validateAll()
      },
      reset () {
        this.current = this.book ? this.book : {}
      }
    },
    components: {
      HtmlEditor, FormField, Tab, Tabs
    }
  }
</script>

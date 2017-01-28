<template>
  <div>
    <form class="uk-form uk-form-horizontal"
          v-if="current">
      <div class="uk-container uk-container-center">
        <ul class="uk-tab" data-uk-tab="{active:0,connect:'#tabContents'}">
          <li><a href="">通用</a></li>
          <li><a href="">摘要</a></li>
        </ul>
        <ul id="tabContents">
          <li>
            <form-field v-for="field in fields"
                        :name="field.name"
                        label="field.label"
                        rules="field.rules"
                        input-type="field.type"
                        :value="current[field.name]">
            </form-field>
          </li>
          <li>
            <!-- 摘要页的内容 -->
            <html-editor :value="current.summary"
                         @change="current.summary = $event"></html-editor>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>
<script>
  import HtmlEditor from './htmleditor'
  import FormField from './form-field'
  import {Tab, Tabs} from './tabs'
  export default {
    props: ['book'],
    data () {
      return {
        current: {},
        fields: [
          {name: 'name', label: '书名', rules: 'required',type:'text'},
          {name: 'isbn', label: '书号', rules: 'required',type:'text'},
          {name: 'price', label: '售价', rules: 'required|numeric|min:0',type:'number'},
          {name: 'category', label: '类别', rules: 'required',type:'text'},
          {name: 'published', label: '出版日期', rules: 'required',type:'date'},
          {name: 'pages', label: '页数', rules: 'required|numeric|min:20',type:'number'},
          {name: 'authors', label: '作者', rules: 'required',type:'text'}
        ]
      }
    },
    components: {
      HtmlEditor, FormField, Tab, Tabs
    }
  }
</script>

<template>
  <div class="app">
    <html-editor :value="summary" @change="onChange($event)"></html-editor>
  </div>
</template>
<script type="text/ecmascript-6">
  import HtmlEditor from './components/htmleditor'
  export default {
    data () {
      return {
        summary: 'WebRTC是一个支持网络浏览器进行实时语音对话或视频对话的软件架构'
      }
    },
    methods: {
      onChange (val) {
        console.log(val)
      }
    },
    components: {HtmlEditor}
  }
</script>

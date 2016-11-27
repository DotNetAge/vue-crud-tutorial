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
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="name">书名</label>
              <div class="uk-form-controls">
                <input id="name"
                       name="name"
                       class="uk-form-width-large"
                       autofocus="autofocus"
                       v-model="current.name"/>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="isbn">书号</label>
              <div class="uk-form-controls">
                <input id="isbn"
                       name="isbn"
                       class="uk-form-width-large"
                       v-model="current.isbn"/>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="price">售价</label>
              <div class="uk-form-controls">
                <input id="price"
                       name="price"
                       class="uk-form-width-large"
                       type="number"
                       v-model="current.price"/>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="catgeory">类别</label>
              <div class="uk-form-controls">
                <input id="catgeory"
                       name="catgeory"
                       class="uk-form-width-large"
                       v-model="current.catgeory"/>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="published">出版日期</label>
              <div class="uk-form-controls">
                <input id="published"
                       type="date"
                       class="uk-form-width-large"
                       name="published"
                       v-model="current.published"
                       placeholder="YYYY-MM-DD"/>
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
                       class="uk-form-width-large"
                       type="number"
                       step="any"
                       v-model="current.pages"/>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label"
                     for="authors">作者</label>
              <div class="uk-form-controls">
                <input id="authors"
                       name="authors"
                       class="uk-form-width-large"
                       v-model="authors"/>
              </div>
            </div>
          </li>
          <li>
            <!-- 摘要页的内容 -->
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    props: ['book'],
    data () {
      return {
        current: {}
      }
    }
  }
</script>

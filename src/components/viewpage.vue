<template>
  <div class="page">
    <slot name="header">
      <page-header :header="title"
                   :sub-header="subTitle">
      </page-header>
    </slot>
    <div class="content">
      <div class="uk-grid uk-margin-large-bottom">
        <div class="uk-width-3-4">
          <div class="uk-grid">
            <div class="uk-width-1-2">
              <slot name="counting"></slot>
            </div>
            <div class="uk-width-1-2">
              <slot name="search"></slot>
            </div>
          </div>
        </div>
        <div class="uk-width-1-4">
          <div class="uk-float-right">
            <slot name="buttons"></slot>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
    <div class="uk-margin-top uk-text-center">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
  import PageHeader from './pageheader'
  export default {
    props: ['title', 'subTitle'],
    components: {PageHeader}
  }
</script>

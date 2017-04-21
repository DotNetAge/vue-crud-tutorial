<template>
  <div class="uk-form">
    <div class="uk-form-icon">
      <i class="uk-icon-search"></i>
      <input type="search"
             class="search-box uk-form-width-large"
             :placeholder="placeholder"
             @keyup.enter="onSearch"
             :value="terms" />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SearchBox',
    props: ['terms', 'placeholder'],
    methods: {
      onSearch (e) {
        this.$emit('search', e.target.value)
      }
    }
  }
</script>

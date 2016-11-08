<template>
  <div class="uk-form-row">
    <label class="uk-form-label"
           :for="elementId">{{ label }}</label>
    <div class="uk-form-controls">
      <input id="elementId"
             class="uk-form-width-large"
             @change="$emit('change',$event.target.value)"
             :value='value'/>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['fileName', 'label', 'value'],
    computed: {
      elementId () {
        return `${this.fieldName}-field`
      }
    }
  }
</script>

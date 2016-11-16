export default {
  name: 'FormField',
  props: ['name', 'label'],
  render (h) {
    return (
      <div class="uk-form-row">
        <label class="uk-form-label"
               for={ this.name }>{ this.label }</label>
        <div class="uk-form-controls">
          { this.$slots.default }
        </div>
      </div>
    )
  }
}

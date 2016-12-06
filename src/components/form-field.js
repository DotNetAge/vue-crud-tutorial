export default {
  name: 'FormField',
  props: {
    name: {type: String},
    label: {type: String},
    rules: {type: String},
    value: {},
    inputType: {type: String, default: 'text'}
  },
  mounted () {
    if (this.rules)
      validator.attach(this.name, this.rules)
  },
  methods: {
    onValidate (e) {
      if (this.rules) {
        this.validator.validate(this.name, e.target.value)
      }
    }
  },
  computed: {
    validator () {
      return this.$parent.$validator
    },
    errorBag () {
      return this.$parent.errors
    },
    hasError () {
      return this.errorBag.has(this.name)
    },
    errorMsg() {
      this.errorBag.first(this.name)
    }
  },
  render (h) {
    return <div class="uk-form-row">
      <label class="uk-form-label"
             for={this.name}>{this.label}</label>
      <div class="uk-form-controls">
        <input id={this.name}
               name={this.name}
               type={this.inputType}
               class={{
                 'uk-form-width-large': true,
                 'uk-form-danger': this.hasError
               }}
               on-input={ onValidate }
               value={this.value}/>
        <small class={{
          'uk-text-danger': true,
          'uk-show': this.hasError
        }}>{ this.errorMsg }</small>
      </div>
    </div>
  }
}

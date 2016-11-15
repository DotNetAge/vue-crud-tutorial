export default {
  name: 'UkButton',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String
    },
    size: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  render (h) {
    const data = {
      class: {
        'uk-button': true,
        'uk-active': this.active,
        [`uk-width-${this.width}`]: this.width,
        'uk-button-primary': this.color === 'primary',
        'uk-button-success': this.color === 'success',
        'uk-button-danger': this.color === 'danger',
        'uk-button-link': this.color === 'link',
        'uk-button-mini': this.size === 'mini',
        'uk-button-small': this.size === 'small',
        'uk-button-large': this.size === 'large'
      }
    }
    let clickHandler = (e) => {
      e.preventDefault()
      this.$emit('click')
    }
    const cssIcon = 'uk-icon-' + this.icon
    const _when = (condition, fn) => {
      if (condition) {
        return fn
      }
    }
    return (
      <button disabled={ this.disabled }
              on-click={ clickHandler }
              {...data}>
      { _when(this.icon, (
        <i class={cssIcon}>
        </i>)
      )
      }
      { this.$slots.default }
    </button>)
  }
}

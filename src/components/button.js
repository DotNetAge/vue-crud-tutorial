export default {
  name: 'UIButton',
  props: {
    text: {
      type: String,
      default: 'Button'
    },
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
  render () {
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

    const _when = (condition, fn) => {
      if (condition) {
        return fn
      }
    }
    return (<button disabled={ this.disabled } {...data}>
        { _when(this.icon, (<i class={ 'uk-icon-' + this.icon }></i>))}
        { _when(this.text, (<span>{ this.text }</span>)) }
      </button>)
  }
}

export default {
  props: ['terms', 'placeholder'],
  template: `<div class="uk-form">
        <div class="uk-form-icon">
          <i class="uk-icon-search"></i>
          <input type="search"
                 class="search-box uk-form-width-large"
                 :placeholder="placeholder"
                 key.enter="$emit('search', $event.target.value)"
                 :value="terms" />
        </div>
      </div>`
}

export default {
  name: 'Empty',
  props: {
    text: {
      type: String,
      default: '抱歉，尚没有找到任何合符条件的图书'
    }
  },
  render (h) {
    return (
      <div class="uk-margin-top uk-text-muted uk-text-large uk-text-center empty-holder">
        { this.text }
      </div>
    )
  }
}

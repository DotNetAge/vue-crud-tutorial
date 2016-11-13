export default {
  props: ['header', 'subHeader'],
  render (h) {
    return (
      <div class="uk-block uk-block-primary uk-contrast page-header">
        <div class="uk-container-center">
          <h1 class="uk-heading-large">{ this.header }
            {
              this.subHeader ? (<small>{ this.subHeader }</small>) : (<small></small>)
            }
          </h1>
        </div>
      </div>
    )
  }
}

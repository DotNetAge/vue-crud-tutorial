import _ from 'lodash'
export default {
  name: 'Field',
  props: {
    name: {type: String},
    item: {type: Object}
  },
  render (h) {
    return (
      <td data-name={this.name}>
        { this.item[this.name] }
      </td>
    )
  }
}

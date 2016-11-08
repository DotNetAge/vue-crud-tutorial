export default {
  name: 'DataTable',
  props: {
    columns: {
      type: Array,
      default: []
    }
  },
  render (h) {
    const renderColumn = (col) => {
      return (
        <th class="uk-text-center uk-width-1-6 disable-select"
            on-click={ this.$emit('sorting', col.name) }>{ col.text }
          (
            <span class={{
              'uk-icon-sort-asc': col.dir === 'asc',
              'uk-icon-sort-desc': col.dir === 'desc'
            }}>
            </span>
          )
        </th>
      )
    }

    return (
      <table class="uk-table uk-table-striped">
        <thead>
        { this.columns.map(renderColumn) }
        </thead>
        <tbody>

        </tbody>
      </table>
    )
  }
}

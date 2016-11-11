export default {
  elements: {
    searchBox: {selector: 'input[type="search"]'},
    checkBoxs: {selector: 'input[type="checkbox"]'},
    deleteButton: {selector: '#btn-delete'}
  },
  commands: [
    {
      search (terms) {
        return this.setValue('@searchBox', [terms, this.Keys.Enter])
      }
    }
  ]
}

import uuid from 'uuid'
export const Tab = {
  name: 'Tab',
  props: {
    label: {
      type: String,
      default: 'Tab'
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    active () {
      return this.index === this.$parent.index
    }
  },
  render (h) {
    return (
      <li>
        { this.$slots.default }
      </li>
    )
  }
}

export const Tabs = {
  name: 'Tabs',
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tabItems: []
    }
  },
  beforeMount () {
    this.tabItems = this.$slots.default.filter(node =>
      node.componentOptions && node.componentOptions.tag === 'tab'
    ).map((node, index) => {
      const data = node.componentOptions.propsData
      data.index = index
      return node
    })
  },
// 以下代码会产生: '[Vue warn]: You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
// (found in component <Tabs>)'  的警告
//   template: `<div>
//     <ul class="uk-tab"
//         data-uk-tab="{ active: 0,connect: '#tabContents'}">
//         <li v-for="tab in tabItems">
//             <a href="">{ tab.label }</a>
//         </li>
//     </ul>
//     <ul class="uk-switcher uk-margin"
//         id="tabContents">
//         <slot></slot>
//     </ul>
// </div>`
  render (h) {
    let tabID = uuid.v4()
    let tabJSON = `{ active:${this.active},connect:'#${tabID}'}`
    return (
      <div>
        <ul class="uk-tab"
            data-uk-tab={tabJSON}>
          {
            this.tabItems.map(tab => (
                <li>
                  <a href="">{ tab.componentOptions.propsData.label }</a>
                </li>
              )
            )
          }
        </ul>
        <ul class="uk-switcher uk-margin"
            id={tabID}>
          {
            this.tabItems.map(tab => (
              <li>
                {
                  tab.componentOptions.children
                }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

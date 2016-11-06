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
    render (h){
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
    render (h) {

        const _tabs = this.$slots.default.filter(node =>
            node.componentOptions && node.componentOptions.tag === 'tab'
        ).map((node, index) => {
            const data = node.componentOptions.propsData
            data.index = index
            return node
        })

        return (
            <div>
                <ul class="uk-tab"
                    data-uk-tab="{ active:0,connect:'#tabContents'}">
                    {
                        _tabs.map( tab =>(
                            <li>
                                <a href="">{ tab.label }</a>
                            </li>
                            )
                        )
                    }
                </ul>
                <ul class="uk-switcher uk-margin"
                    id="tabContents">
                    { _tabs }
                </ul>
            </div>
        )
    }
}

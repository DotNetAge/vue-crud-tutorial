import 'jquery'
import 'uikit'
import "uikit-css"
import "uikit-theme"

export default (Vue, options) => {
    // 向实例注入
    Vue.prototype.$ui = {
        alert: UIkit.modal.alert,
        confirm: UIkit.modal.confirm,
        prompt: UIkit.modal.prompt,
        block: UIkit.modal.block
    }
}

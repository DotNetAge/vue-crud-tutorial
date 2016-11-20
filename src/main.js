import Vue from 'vue'
import UIKit from './vue-uikit'
import VueResource from 'vue-resource'
import App from './App.vue'
// import VueValidator from 'vue-validator'
import messages from './vee-local-fixed'
import VeeValidate from 'vee-validate'

Vue.use(UIKit)
Vue.use(VueResource)
Vue.use(VeeValidate, {
  locale: 'zh_CN',
  dictionary: {
    zh_CN: {messages}
  }
})

// Vue.use(VueValidator)

Vue.http.interceptors.push((request, next) => {
  if (request.url.indexOf('/api/') > -1) {
    let modal = window.UIkit.modal.blockUI(`<div class="uk-modal-spinner"></div>
<p class="uk-text-center">玩命加载中...</p>`, { center: true })

    next((response) => {
      modal.hide()
      return response
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})


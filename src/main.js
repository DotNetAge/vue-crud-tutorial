// import 'jquery'
// import 'uikit'
// import "uikit-css"
// import "uikit-theme"
import UIkit from './uikit'
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
// import Editor from './Editor.vue'

Vue.use(UIkit)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})


import Vue from 'vue'
import UIKit from './vue-uikit'
import VueResource from 'vue-resource'
import App from './App.vue'
// import Editor from './Editor.vue'

Vue.use(UIKit)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})


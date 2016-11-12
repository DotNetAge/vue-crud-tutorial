import Vue from 'vue'

export const getVM = (render, components) => {
  return new Vue({
    el: document.createElement('div'),
    render,
    components
  }).$mount()
}

import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'
window.$ = $

import '../../styles/base.scss'

import '@vant/touch-emulator'
import { Button, Field, Form, Toast } from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Form)
Vue.use(Toast)



import axios from '@/common/axios'

Vue.prototype.$http = axios


Vue.directive('focus-border', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    const input = el.querySelector('input');
    input.addEventListener('focus', function () {
      el.classList.add('input-active');
    });
    input.addEventListener('blur', function () {
      el.classList.remove('input-active');
    });
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

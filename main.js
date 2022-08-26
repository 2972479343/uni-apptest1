import App from './App'
import { $http } from '@escook/request-miniprogram'
// #ifndef VUE3
import Vue from 'vue'
import store from './store/store.js'
import tabMixin from './mixins/tabbar-icon.js';
// let tabMixin = require('@/mixins/tabbar-icon.js');
Vue.mixin(tabMixin);
uni.$http = $http
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
  title,
  duration,
  icon: 'none',
  })
  }
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
  $http.beforeRequest = function (options) {
  uni.showLoading({
  title: '数据加载中...',
  })
  }
  $http.afterRequest = function () {
  uni.hideLoading()
  }
  
}
// #endif
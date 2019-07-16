import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'

//import '../theme/index.css';
import axios from 'axios'
import { Message } from 'element-ui';
import api from './api/api'
import timeFormat from './api/format'
import dateFormat from './api/format'
import state from './api/format'
Vue.prototype.$message = Message;
Vue.prototype.$axios = axios


// Vue.use(timeFormat);
// Vue.use(dateFormat);
// Vue.use(state);
Vue.use(VueI18n)
Vue.use(ElementUI,{zhLocale})
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.use(require('vue-moment'));





function InitLanguage() {
  return localStorage.getItem("defaultLanguage") == null ? 'zh-CN' : localStorage.getItem("defaultLanguage");
 }


const i18n = new VueI18n({
  locale:  InitLanguage(), // 语言标识,默认汉语,先去cookie查找，如果存在并有效，cookie值即为默认语言类型；否则默认为中文简体
  messages: {
    'en-US': Object.assign(require("../static/lang/en"),enLocale),
    'zh-CN': Object.assign(require("../static/lang/zh-CN"),zhLocale),
    'zh-TW': Object.assign(require("../static/lang/zh-TW"),twLocale)
  }
});
locale.i18n((key, value) => i18n.t(key, value));//为了之后将element-ui组件本地化
//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes,
  api
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  i18n,//将VueI18n挂载到vue实例上
  //components: { App }
  render: h => h(App)
}).$mount('#app')


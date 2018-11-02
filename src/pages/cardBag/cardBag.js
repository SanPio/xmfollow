// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import axios from 'axios'
import { Navbar, TabItem } from 'mint-ui'
import { TabContainer, TabContainerItem } from 'mint-ui'
import { Loadmore } from 'mint-ui'
import { MessageBox } from 'mint-ui';
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.component(Loadmore.name, Loadmore)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
//   router,
  components: { App },
  template: '<App/>'
})
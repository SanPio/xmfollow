// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import { Swipe, SwipeItem } from 'mint-ui'
import { Badge } from 'mint-ui';
import axios from 'axios'
import qs from 'qs'
Vue.component(Badge.name, Badge);
Vue.prototype.$qs = qs
Vue.prototype.$http = axios
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
})
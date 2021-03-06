// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import axios from 'axios'
import qs from 'qs'

// import { Swipe, SwipeItem } from 'mint-ui';

// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);

Vue.prototype.$qs = qs
Vue.prototype.$http = axios
Vue.config.productionTip = false

import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';

import touch from 'vue-directive-touch';
Vue.use(touch);

/* eslint-disable no-new */
new Vue({
  el: '#app',
//   router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import App from './App'
// import router from './router'
import axios from 'axios'
import qs from 'qs'
import { Switch } from 'mint-ui'
import { MessageBox } from 'mint-ui';
Vue.prototype.$qs = qs
Vue.component(Switch.name, Switch)

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
//   router,
  components: { App },
  template: '<App/>'
})
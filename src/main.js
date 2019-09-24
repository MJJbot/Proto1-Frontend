import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import feather from 'vue-icon'
import axios from 'axios';
import cookies from 'vue-cookies'



// Vue.directive('auto-bottom', {
//   update: (el) => {
//     setTimeout(() => {
//       el.scrollTop = el.scrollHeight;
//     }, 0);
//   },
// });

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(feather,'v-icon')
Vue.use(cookies)

new Vue({
  router,
  store,
  vuetify,
  cookies,
  render: h => h(App)
}).$mount('#app')

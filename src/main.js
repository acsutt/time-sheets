import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VCalendar from 'v-calendar';
import Vuelidate from 'vuelidate'
import Vuetify from '@/plugins/vuetify'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VCalendar);
Vue.use(Vuelidate);
Vue.use(Vuetify);

new Vue({
  router,
  BootstrapVue,
  IconsPlugin,
  VCalendar,
  Vuelidate,
  Vuetify,
  vuetify,
  render: h => h(App)
}).$mount('#app')
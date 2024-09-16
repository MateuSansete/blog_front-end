import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/Global.css';
import './assets/Variables.css';
import './assets/Layout.css';
import './assets/Utilities.css';


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

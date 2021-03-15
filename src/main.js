import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification';
import velocity from 'velocity-animate';
import VuePageTransition from 'vue-page-transition';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VuePageTransition);
Vue.use(Notifications, { velocity });

new Vue({
  router,
  store,
  vuetify,
  VuePageTransition,
  render: h => h(App),
}).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import VueWorker from 'vue-worker';
Vue.config.productionTip = false;

Vue.use(VueWorker);
new Vue({
  render: (h) => h(App),
}).$mount('#app');

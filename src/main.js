import { createApp } from 'vue'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// loading
// Import component
import Loading from 'vue3-loading-overlay';
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
// filter
import { currency, date } from './methods/filters';
import App from './App.vue'
import router from './router'

const app = createApp(App);
// 設定全域屬性
app.config.globalProperties.$filters = {
  currency,
  date
};
app.use(VueAxios, axios);
app.use(router);
app.component('VueLoading', Loading);
app.mount('#app');

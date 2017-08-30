import Vue from 'vue';

import App from './components/app';
import router from './routes';
import store from './store';
import './styles/styles.scss';

export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});

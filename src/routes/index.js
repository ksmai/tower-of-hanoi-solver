import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/' },
    { path: '*', redirect: '/' },
  ],
  base: '/tower-of-hanoi-solver',
  mode: 'history',
});

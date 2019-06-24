import Vue from 'vue';
import Router from 'vue-router';
import Scores from './components/Scores.vue';
import Ping from './components/Ping.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Scores',
      component: Scores,
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping,
    },
  ],
});

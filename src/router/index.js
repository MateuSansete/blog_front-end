import Vue from 'vue';
import Router from 'vue-router';
import UserLogin from '../views/UserLogin.vue'; // Atualizado para o novo nome
import BlogDashboard from '../views/BlogDashboard.vue'; // Atualizado para o novo nome

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: UserLogin }, // Atualizado para o novo nome
    { path: '/dashboard', component: BlogDashboard } // Atualizado para o novo nome
  ]
});

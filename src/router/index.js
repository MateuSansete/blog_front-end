import Vue from 'vue';
import Router from 'vue-router';
import UserLogin from '../views/UserLogin.vue'; // Atualizado para o novo nome
import HomeView from '../views/HomeView.vue'; // Atualizado para o novo nome

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: UserLogin }, // Atualizado para o novo nome
    { path: '/dashboard', component: HomeView } // Atualizado para o novo nome
  ]
});

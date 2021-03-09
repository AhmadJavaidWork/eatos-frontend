import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));
  const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
  if (to.meta.requiresAuth) {
    if (user && token && expiresAt) {
      if (!user.name && to.path !== '/edit-profile') {
        next('/edit-profile');
      } else if (to.meta.admin) {
        if (user.role === 'admin') {
          next();
        } else {
          next('/dashboard');
        }
      } else {
        next();
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      next('/signin');
    }
  } else {
    next();
  }
});

export default router;

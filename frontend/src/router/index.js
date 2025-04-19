import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      isSecured: true,
    },
    component: () => import( '../views/HomeView.vue')

  },
  {
    path: '/edit/:id',
    name: 'edit',
    meta: {
      isSecured: true,
    },
    component: () => import( '../views/EditView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/LoginView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeResolve((a) => {

  if(a.meta.isSecured && !store.getters.isAuthenticated) 
    router.push('/login')
  if(store.getters.isAuthenticated && a.name == 'login')
    router.push('/')
});

export default router

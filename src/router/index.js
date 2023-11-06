import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NutritionView from '../views/NutritionView.vue'
import ChatbotView from '../views/ChatbotView.vue'
import UpdateView from '../views/UpdateView.vue'
import ChangeBodyView from "../views/ChangeBodyView.vue"
import ChnagePasswordView from "../views/ChangePasswordView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/nutrition',
      name: 'nutrition',
      component: NutritionView
    },
    {
      path: '/chatbot',
      name: 'chatbot',
      component: ChatbotView
    },
    {
      path: '/update',
      name: 'update',
      component: UpdateView
    },
    {
      path: '/update/changebody',
      name: 'changebody',
      component: ChangeBodyView
    },
    {
      path: '/update/changepassword',
      name: 'changepassword',
      component: ChnagePasswordView
    }
  ]
})

export default router

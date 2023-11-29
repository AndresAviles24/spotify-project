import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormView from '../views/FormView.vue'
import SuggestionView from '../views/SuggestionView.vue'
import { useSpotifyStore } from '@/stores/spotifyStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/form',
      name: 'form',
      component: FormView
    },
    {
      path: '/suggestions',
      name: 'suggestions',
      component: SuggestionView,
      beforeEnter: (to, from, next) => {
        const spotifyStore = useSpotifyStore()
        if (spotifyStore.recommendations.length === 0) {
          next({ name: 'home' }) // Redirige a la página principal si no hay recomendaciones
        } else {
          next() // Continúa a la página de sugerencia de playlist si hay recomendaciones
        }
      }
    }
  ]
})

export default router

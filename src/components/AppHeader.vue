<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">Título de Aplicación</span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/nueva-playlist">Nueva Playlist</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/historial">Historial</router-link>
          </li>
        </ul>
        <button class="btn btn-outline-danger" type="button" @click="logout">Cerrar Sesión</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useSpotifyStore } from '@/stores/spotifyStore'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const spotifyStore = useSpotifyStore()
    const router = useRouter()

    const logout = () => {
      spotifyStore.clearTokens() // Llama a una acción en tu store para limpiar los tokens
      router.push('/') // Redirige al usuario a la página de inicio de sesión o a la principal
    }

    return { logout }
  }
}
</script>

<style scoped>
.navbar {
  background-color: rgb(0, 128, 0);
}
</style>

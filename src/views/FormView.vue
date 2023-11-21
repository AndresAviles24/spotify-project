<template>
  <main>
    <app-header />
    <div class="dashboard-container">
      <h1>Tu Dashboard de Spotify</h1>
      <br />
      <top-artists v-if="authorized" />
      <top-tracks v-if="authorized" />
      <genres-list v-if="authorized" />
      <!-- Input para el total de canciones -->
      <div class="track-count" v-if="authorized">
        <br />
        <label for="track-count">Total de canciones (entre 1 y 100)</label>
        <input type="number" id="track-count" min="1" max="100" v-model.number="trackCount" />
      </div>

      <!-- Especificaciones adicionales -->
      <div class="additional-specs" v-if="authorized">
        <br />
        <label for="additional-specs">Especificaciones adicionales</label>
        <input type="text" id="additional-specs" v-model="additionalSpecifications" />
      </div>

      <!-- Botón para generar la playlist -->
      <div v-if="authorized">
        <br />
        <button @click="generatePlaylist">Generar Playlist</button>
      </div>
      <p v-else>Autorizando...</p>
    </div>
    <app-footer />
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSpotifyStore } from '@/stores/spotifyStore'
import { getToken } from '@/services/auth'
import TopArtists from '@/components/TopArtists.vue'
import TopTracks from '@/components/TopTracks.vue'
import GenresList from '@/components/GenresList.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  data() {
    return {
      trackCount: 1
    }
  },
  watch: {
    trackCount(newValue) {
      if (newValue < 1) {
        this.trackCount = 1
      } else if (newValue > 100) {
        this.trackCount = 100
      }
    }
  },
  components: {
    TopArtists,
    TopTracks,
    GenresList,
    AppHeader,
    AppFooter
  },
  setup() {
    const authorized = ref(false)
    const route = useRoute()
    const router = useRouter()
    const spotifyStore = useSpotifyStore()

    onMounted(async () => {
      const code = route.query.code
      if (code && !spotifyStore.accessToken) {
        try {
          const tokenData = await getToken(code)
          spotifyStore.setToken(tokenData.access_token)
          authorized.value = true // actualiza la propiedad reactiva
        } catch (error) {
          console.error('Error al obtener el token:', error)
          router.push('/') // usa useRouter para navegar
        }
      } else if (spotifyStore.accessToken) {
        authorized.value = true // usuario ya está autorizado
      }
    })

    return {
      authorized
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px; /* O el ancho máximo que prefieras */
  padding: 0 1rem; /* Esto añade un espacio a los lados dentro del contenedor */
}
.additional-specs input[type='text'] {
  width: 100%; /* Establece el ancho al 100% del contenedor padre */
  height: 3rem; /* Establece una altura de 3 rem */
  padding: 0.5rem; /* Añade algo de relleno para que el texto no esté justo en el borde */
  font-size: 1rem; /* Ajusta el tamaño de la fuente si es necesario */
  margin-bottom: 1rem; /* Añade un margen inferior */
}

/* Puedes añadir media queries si necesitas que sea responsive */
@media (max-width: 768px) {
  .additional-specs input[type='text'] {
    height: 2rem; /* Una altura más pequeña para dispositivos más pequeños */
  }
}
</style>

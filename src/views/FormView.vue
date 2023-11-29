<template>
  <main>
    <app-header />
    <div class="dashboard-container">
      <h1>Tu Dashboard de Spotify</h1>
      <br />
      <top-artists v-if="authorized" />
      <top-tracks v-if="authorized" />

      <!-- <genres-list v-if="authorized" /> -->
      <div class="track-count" v-if="authorized">
        <br />
        <label for="track-count">Total de canciones (entre 1 y 100, 20 por defecto)</label>
        <input type="number" id="track-count" min="1" max="100" v-model.number="trackCount" />
      </div>

      <div class="additional-specs" v-if="authorized">
        <br />
        <label for="additional-specs">Especificaciones adicionales</label>
        <input type="text" id="additional-specs" v-model="additionalSpecifications" />
      </div>

      <!-- Botón para generar la playlist -->
      <div v-if="authorized">
        <button @click="generatePlaylist">Generar Playlist</button>
        <br />
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
// import GenresList from '@/components/GenresList.vue'
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
      const numValue = Number(newValue)
      if (isNaN(numValue) || numValue === 0) {
        this.trackCount = '' // Establecemos el valor a una cadena vacía si es NaN o cero
      } else if (numValue < 1) {
        this.trackCount = 1 // Establecemos el mínimo si es menor que 1
      } else if (numValue > 100) {
        this.trackCount = 100 // Establecemos el máximo si es mayor que 100
      } else {
        this.trackCount = numValue // Mantenemos el valor numérico si está dentro del rango válido
      }
    }
  },
  components: {
    TopArtists,
    TopTracks,
    // GenresList,
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
  },
  methods: {
    async generatePlaylist() {
      // Accede a la instancia de tu store de Pinia
      const spotifyStore = useSpotifyStore()

      // Ya tienes acceso a selectedArtists, selectedTracks y selectedGenres directamente desde el store
      const { selectedArtists, selectedTracks } = spotifyStore
      const trackCount = this.trackCount

      // Opciones para las recomendaciones de Spotify
      const options = {
        seed_artists: selectedArtists.join(','),
        seed_tracks: selectedTracks.join(','),
        // seed_genres: selectedGenres.join(','),
        limit: trackCount
      }

      // console.log(options)

      try {
        // Llama a la acción de Pinia para obtener las recomendaciones
        await spotifyStore.fetchRecommendations(options)

        console.log(spotifyStore.recommendations)

        this.$router.push('/suggestions')
      } catch (error) {
        console.error('Hubo un error al generar las recomendaciones:', error)
        // Manejar el error como creas conveniente
      }
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding: 0 1rem;
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

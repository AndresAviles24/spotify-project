<template>
  <div class="top-tracks-container">
    <h2>Tus Canciones Más Escuchadas (elegir hasta 5)</h2>
    <form class="track-selection-form">
      <div v-if="topTracks.length > 0" class="track-cards-container">
        <div class="card" v-for="track in topTracks" :key="track.id">
          <label :for="`track-${track.id}`">
            <img
              class="card-img-top track-image"
              :src="track.album.images[0]?.url"
              :alt="track.name"
            />
            <div class="card-body">
              <h5 class="card-title">{{ track.name }}</h5>
              <p class="card-text">{{ track.album.name }}</p>
              <input
                type="checkbox"
                :id="`track-${track.id}`"
                :value="track.id"
                v-model="selectedTracks"
                @change="checkLimit"
              />
            </div>
          </label>
        </div>
      </div>
      <p v-else>Cargando tus canciones más escuchadas...</p>
    </form>
  </div>
</template>
<script>
import { useSpotifyStore } from '@/stores/spotifyStore'

export default {
  name: 'TopTracks',
  computed: {
    topTracks() {
      const spotifyStore = useSpotifyStore()
      return spotifyStore.topTracks
    },
    selectedTracks: {
      get() {
        const spotifyStore = useSpotifyStore();
        return spotifyStore.selectedTracks;
      },
      set(value) {
        const spotifyStore = useSpotifyStore();
        spotifyStore.updateSelectedTracks(value);
      }
    }
  },
  methods: {
    checkLimit() {
      if (this.selectedTracks.length > 5) {
        this.selectedTracks = this.selectedTracks.slice(0, 5)
      }
    }
  },
  async created() {
    const spotifyStore = useSpotifyStore()
    if (!spotifyStore.accessToken) {
      this.$router.push('/')
    } else {
      try {
        await spotifyStore.fetchTopTracks()
      } catch (error) {
        console.error('Error cargando las canciones más escuchadas:', error)
      }
    }
  }
}
</script>

<style scoped>
.track-cards-container {
  display: flex;
  flex-wrap: nowrap; /* Previene el salto de línea */
  gap: 1rem;
  overflow-x: auto; /* Agrega desplazamiento horizontal */
  -webkit-overflow-scrolling: touch; /* Permite desplazamiento suave en iOS */
}

.card {
  flex: 0 0 auto; /* No permite que las tarjetas se estiren o encogan */
  width: 200px; /* Establece el ancho de la tarjeta */
}

.card-img-top {
  width: 100%; /* Asegura que la imagen se ajuste al ancho de la tarjeta */
  height: 200px; /* Establece una altura fija para la imagen */
  object-fit: cover; /* Asegura que la imagen cubra completamente el espacio sin distorsionarse */
  object-position: center; /* Centra la imagen dentro del contenedor */
}
</style>

<template>
  <div class="top-artists-container">
    <h2>Tus Artistas Más Escuchados (elegir hasta 5)</h2>
    <form class="artist-selection-form" v-if="topArtists.length > 0">
      <div class="artist-cards-container">
        <div class="card" v-for="artist in topArtists" :key="artist.id">
          <label :for="`artist-${artist.id}`">
            <img
              class="card-img-top artist-image"
              :src="artist.images[0]?.url"
              :alt="artist.name"
            />
            <div class="card-body">
              <h5 class="card-title">{{ artist.name }}</h5>
              <input
                type="checkbox"
                :id="`artist-${artist.id}`"
                :value="artist.id"
                v-model="selectedArtists"
                @change="checkLimit"
              />
            </div>
          </label>
        </div>
      </div>
    </form>
    <p v-else>Cargando tus artistas más escuchados...</p>
  </div>
</template>

<script>
import { useSpotifyStore } from '@/stores/spotifyStore'

export default {
  name: 'TopArtists',
  data() {
    return {
      selectedArtists: []
    }
  },
  computed: {
    topArtists() {
      const spotifyStore = useSpotifyStore()
      return spotifyStore.topArtists
    }
  },
  methods: {
    checkLimit() {
      if (this.selectedArtists.length > 5) {
        this.selectedArtists = this.selectedArtists.slice(0, 5)
      }
    }
  },
  async created() {
    const spotifyStore = useSpotifyStore()
    if (!spotifyStore.accessToken) {
      this.$router.push('/')
    } else {
      try {
        await spotifyStore.fetchTopArtists()
      } catch (error) {
        console.error('Error cargando los artistas más escuchados:', error)
      }
    }
  }
}
</script>

<style scoped>
.artist-cards-container {
  display: flex;
  flex-wrap: nowrap; /* Evita que las tarjetas se envuelvan */
  gap: 1rem;
  overflow-x: auto; /* Permite el desplazamiento horizontal */
  -webkit-overflow-scrolling: touch; /* Mejora el desplazamiento en dispositivos táctiles iOS */
}

.card {
  flex: 0 0 auto; /* Evita que las tarjetas se estiren o se encogen */
  width: 150px; /* Puedes ajustar esto según el diseño que desees */
}

.artist-image {
  width: 100%; /* Esto mantendrá el ancho de la imagen al 100% del contenedor .card */
  height: 150px; /* Esto mantendrá la altura de la imagen */
  object-fit: cover; /* Esto asegurará que la imagen cubra el área designada sin distorsionarse */
}
</style>

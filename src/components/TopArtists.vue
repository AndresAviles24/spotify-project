<template>
  <div class="top-artists-container">
    <h2>Tus Artistas Más Escuchados (elegir hasta 5)</h2>
    <div v-if="topArtists.length > 0" class="d-flex flex-wrap">
      <div class="card" v-for="artist in topArtists" :key="artist.id" style="width: 18rem;">
        <img class="card-img-top" :src="artist.images[0]?.url" :alt="artist.name">
        <div class="card-body">
          <h5 class="card-title">{{ artist.name }}</h5>
          <button class="btn btn-primary">Seleccionar</button>
        </div>
      </div>
    </div>
    <p v-else>Cargando tus artistas más escuchados...</p>
  </div>
</template>

  <script>
  import { useSpotifyStore } from '@/stores/spotifyStore';
  
  export default {
    name: 'TopArtists',
    computed: {
      // Usa una propiedad computada para acceder al estado del store
      topArtists() {
        const spotifyStore = useSpotifyStore();
        return spotifyStore.topArtists;
      }
    },
    async created() {
      const spotifyStore = useSpotifyStore();
      if (!spotifyStore.accessToken) {
        this.$router.push('/');
      } else {
        try {
          // Llama a la acción de Pinia para cargar los artistas
          await spotifyStore.fetchTopArtists();
        } catch (error) {
          console.error('Error cargando los artistas más escuchados:', error);
        }
      }
    }
  };
  </script>
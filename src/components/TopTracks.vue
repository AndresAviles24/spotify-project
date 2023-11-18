<template>
  <div class="top-tracks-container">
    <h2>Tus Canciones Más Escuchadas (elegir hasta 5)</h2>
    <div v-if="topTracks.length > 0" class="d-flex flex-wrap">
      <div class="card" v-for="track in topTracks" :key="track.id" style="width: 18rem;">
        <img class="card-img-top" :src="track.album.images[0].url" :alt="track.name">
        <div class="card-body">
          <h5 class="card-title">{{ track.name }}</h5>
          <p class="card-text">{{ track.album.name }}</p>
          <button class="btn btn-primary">Seleccionar</button>
        </div>
      </div>
    </div>
    <p v-else>Cargando tus canciones más escuchadas...</p>
  </div>
</template>


  
  <script>
  import { useSpotifyStore } from '@/stores/spotifyStore';
  
  export default {
    name: 'TopTracks',
    computed: {
      // Usa una propiedad computada para acceder al estado del store
      topTracks() {
        const spotifyStore = useSpotifyStore();
        return spotifyStore.topTracks;
      }
    },
    async created() {
      const spotifyStore = useSpotifyStore();
      if (!spotifyStore.accessToken) {
        this.$router.push('/');
      } else {
        try {
          // Llama a la acción de Pinia para cargar las pistas
          await spotifyStore.fetchTopTracks();
        } catch (error) {
          console.error('Error cargando las canciones más escuchadas:', error);
        }
      }
    }
  };
  </script>
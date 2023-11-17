<template>
    <div class="top-artists-container">
      <h2>Tus Artistas Más Escuchados</h2>
      <ul v-if="topArtists.length > 0">
        <li v-for="artist in topArtists" :key="artist.id">
          {{ artist.name }}
        </li>
      </ul>
      <p v-else>Cargando tus artistas más escuchados...</p>
    </div>
  </template>
  
  <script>
  import { useSpotifyStore } from '@/stores/spotifyStore';
  
  export default {
    name: 'TopArtists',
    data() {
      return {
        topArtists: []
      };
    },
    async created() {
      const spotifyStore = useSpotifyStore();
      if (!spotifyStore.accessToken) {
        this.$router.push('/');
      } else {
        try {
          const response = await spotifyStore.getTopArtists();
          this.topArtists = response.data.items;
        } catch (error) {
          console.error('Error cargando los artistas más escuchados:', error);
          // Manejar errores aquí
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  
<template>
    <div class="top-tracks-container">
      <h2>Tus Canciones Más Escuchadas</h2>
      <ul v-if="topTracks.length > 0">
        <li v-for="track in topTracks" :key="track.id">
          {{ track.name }} por {{ track.artists.map(artist => artist.name).join(', ') }}
        </li>
      </ul>
      <p v-else>Cargando tus canciones más escuchadas...</p>
    </div>
  </template>
  
  <script>
  import { useSpotifyStore } from '@/stores/spotifyStore';
  
  export default {
    name: 'TopTracks',
    data() {
      return {
        topTracks: []
      };
    },
    async created() {
      const spotifyStore = useSpotifyStore();
      if (!spotifyStore.accessToken) {
        this.$router.push('/');
      } else {
        try {
          const response = await spotifyStore.getTopTracks();
          this.topTracks = response.data.items;
        } catch (error) {
          console.error('Error cargando las canciones más escuchadas:', error);
          // Manejar errores, por ejemplo, refrescar token o redirigir al login
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  
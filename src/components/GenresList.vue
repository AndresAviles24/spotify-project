<template>
    <div class="genres-list-container">
      <h2>Géneros Musicales Disponibles</h2>
      <ul v-if="genres.length > 0">
        <li v-for="genre in genres" :key="genre">
          {{ genre }}
        </li>
      </ul>
      <p v-else>Cargando géneros musicales...</p>
    </div>
  </template>
  
  <script>
  import { useSpotifyStore } from '@/stores/spotifyStore';
  
  export default {
    name: 'GenresList',
    data() {
      return {
        genres: []
      };
    },
    async created() {
      const spotifyStore = useSpotifyStore();
      if (!spotifyStore.accessToken) {
        this.$router.push('/');
      } else {
        try {
          const response = await spotifyStore.getGenres();
          this.genres = response.data.genres;
        } catch (error) {
          console.error('Error cargando los géneros musicales:', error);
          // Manejar errores aquí
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  
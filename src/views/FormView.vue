<template>
    <div class="dashboard-container">
      <h1>Tu Dashboard de Spotify</h1>
      <top-artists />
      <top-tracks />
      <genres-list />
    </div>
  </template>
  
  <script>
  import TopArtists from '@/components/TopArtists.vue';
  import TopTracks from '@/components/TopTracks.vue';
  import GenresList from '@/components/GenresList.vue';
  
  export default {
    name: 'Dashboard',
    components: {
      TopArtists,
      TopTracks,
      GenresList
    },
    created() {
      // Lógica para comprobar la autenticación y cargar datos
    }
  };
  </script>
  
  <style scoped>
  </style>
  
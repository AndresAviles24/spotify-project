<template>
    <main>
      <app-header />
      <div class="playlist-suggestion-container">
        <h1>Nueva playlist sugerida</h1>
        <table class="suggestion-table">
          <thead>
            <tr>
              <th>#</th>
              <th></th> <!-- Column for album image -->
              <th>Título</th>
              <th>Álbum</th>
              <th>Duración</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(track, index) in recommendations" :key="track.id">
              <td>{{ index + 1 }}</td>
              <td>
                <!-- Include a small album image -->
                <img :src="track.album.images[0]?.url" class="album-cover" alt="Album Cover" />
              </td>
              <td>{{ track.name }}</td>
              <td>{{ track.album.name }}</td>
              <td>{{ formatDuration(track.duration_ms) }}</td>
              <td>
                <button @click="removeTrack(track.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="playlist-actions">
          <button @click="cancel">Cancelar</button>
          <button @click="createPlaylist">Crear Playlist</button>
        </div>
      </div>
      <app-footer />
    </main>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  import { useRouter } from 'vue-router';
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  import { useSpotifyStore } from '@/stores/spotifyStore';
  
  export default {
    components: {
      AppFooter,
      AppHeader
    },
    setup() {
      
        const router = useRouter();
        const spotifyStore = useSpotifyStore();
      const recommendations = spotifyStore.recommendations;
  
      const removeTrack = (trackId) => {
        Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí va la lógica para eliminar la canción de la lista de recomendaciones
          // Filtramos las recomendaciones actuales para excluir la canción eliminada
          spotifyStore.recommendations = recommendations.value.filter((track) => track.id !== trackId);

          // Opcionalmente, muestra un mensaje de éxito
          Swal.fire(
            'Eliminado',
            'La canción ha sido eliminada de las recomendaciones.',
            'success'
          );
        }
      });
      };
  
      const cancel = () => {
        Swal.fire({
        title: '¿Estás seguro?',
        text: "Si cancelas, la playlist será eliminada permanentemente.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'No, volver'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/form'); // Redirige al usuario a /form si confirma
        }
      });
      };
  
      // Implement function to create a new playlist
      const createPlaylist = () => {
        // ... logic to create playlist
      };
  
      // Convert milliseconds to mm:ss format
      const formatDuration = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = ((durationMs % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      };
  
      return {
        recommendations,
        removeTrack,
        cancel,
        createPlaylist,
        formatDuration
      };
    }
  };
  </script>
  
  <style scoped>
  .playlist-suggestion-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .suggestion-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .suggestion-table th,
  .suggestion-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .album-cover {
    width: 50px; /* Adjust size as needed */
    height: 50px; /* Adjust size as needed */
    object-fit: cover;
  }
  
  .playlist-actions {
    margin-top: 20px;
    text-align: right;
  }
  
  .playlist-actions button {
    margin-right: 10px;
    padding: 10px 20px;
  }
  </style>
  
<template>
  <main>
    <app-header />
    <div class="playlist-suggestion-container">
      <input 
        type="text" 
        class="playlist-title-input" 
        v-model="playlistTitle" 
        placeholder="Nombre de la nueva playlist"
      />
      <table class="suggestion-table">
        <thead>
          <tr>
            <th>#</th>
            <th></th> <!-- Column for album image -->
            <th>Título</th>
            <th>Artista</th>
            <th>Álbum</th>
            <th>Duración</th>
            <th>30 segundos de prueba</th>
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
      <td>{{ track.artists[0].name }}</td>
      <td>{{ track.album.name }}</td>
      <td>{{ formatDuration(track.duration_ms) }}</td>
      <td>
        <audio
          :src="track.preview_url"
          controls
          @play="handleAudioPlay($event, index)"
          class="audio-preview"
        ></audio>
      </td>
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
  import { ref } from 'vue';
  import AppFooter from '@/components/AppFooter.vue';
  import { useSpotifyStore } from '@/stores/spotifyStore';
  
  export default {
    components: {
      AppFooter,
      AppHeader
    },
    data() {
    return {
      playlistTitle: ''
    };
  },
    setup() {
      
        const router = useRouter();
        const spotifyStore = useSpotifyStore();
      const recommendations = spotifyStore.recommendations;
    const playlistTitle = ref(''); // Ref para el título de la playlist
  
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

      const createPlaylist = async () => {
      if (!playlistTitle.value.trim()) {
        // Mostrar error si el título está vacío
        await Swal.fire({
          title: 'Error',
          text: 'Por favor, ingresa un nombre para la playlist.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }

      try {
        // Llama a la acción de Pinia para crear la playlist
        const playlistId = await spotifyStore.createPlaylist(playlistTitle.value);

        // Llama a la acción de Pinia para agregar canciones a la playlist
        const trackUris = recommendations.value.map(track => track.uri);
        await spotifyStore.addTracksToPlaylist(playlistId, trackUris);

        // Muestra un mensaje de éxito y redirige
        await Swal.fire({
          title: '¡Éxito!',
          text: 'Playlist creada y canciones añadidas.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        router.push('/some-route'); // Asegúrate de cambiar '/some-route' a la ruta que necesitas
      } catch (error) {
        console.error('Error al crear la playlist:', error);
        // Manejo de errores
      }
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
        createPlaylist,
        cancel,
        formatDuration,
      };
    },
    methods: {
      handleAudioPlay(event, index) {
      document.querySelectorAll('audio').forEach((audioEl, idx) => {
        if (idx !== index) {
          audioEl.pause();
          audioEl.currentTime = 0;
        }
      });
    },
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

  audio {
  max-width: 100%;
  height: 30px; /* Ajusta según tus necesidades */
}

.audio-preview {
  width: 100%; /* Establece el ancho al 100% para una mayor visibilidad */
  height: auto; /* Ajusta automáticamente la altura */
}
  </style>
  
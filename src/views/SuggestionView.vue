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
              <img 
                :src="track.album.images[0]?.url" 
                class="album-cover" 
                alt="Album Cover" 
                @click="showPopup = true; selectedTrack = track"
              />
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

  <!-- Popup para mostrar detalles de la canción -->
  <div v-if="showPopup" class="popup-container" @click="showPopup = false">
    <div class="popup" @click.stop>
      <div class="popup-content">
        <img :src="selectedTrack.album.images[0]?.url" class="album-cover-large" alt="Album Cover" />
        <div class="track-details">
          <h2>{{ selectedTrack.name }}</h2>
          <p>Artista: {{ selectedTrack.artists.map(artist => artist.name).join(', ') }}</p>
          <p>Álbum: {{ selectedTrack.album.name }}</p>
          <p>Año de lanzamiento: {{ selectedTrack.album.release_date.split('-')[0] }}</p>
          <p>Duración: {{ formatDuration(selectedTrack.duration_ms) }}</p>
          <!-- Más detalles si están disponibles -->
          <p>Nivel de popularidad (0-100): {{ selectedTrack.popularity }}</p>
          <p v-if="selectedTrack.explicit">Contenido Explícito</p>
          <a :href="selectedTrack.external_urls.spotify" target="_blank">Escuchar en Spotify</a>
        </div>
      </div>
      <button @click="showPopup = false">Cerrar</button>
    </div>
  </div>
</template>

  <script>
  import Swal from 'sweetalert2';
  import { useRouter } from 'vue-router';
  import AppHeader from '@/components/AppHeader.vue';
  // import { ref } from 'vue';
  import AppFooter from '@/components/AppFooter.vue';
  import { useSpotifyStore } from '@/stores/spotifyStore';
  
  export default {
    components: {
      AppFooter,
      AppHeader
    },
    data() {
    return {
      playlistTitle: 'Nueva Playlist',
      showPopup: false,
      selectedTrack: null,
    };
  },
    setup() {
        const router = useRouter();
        const spotifyStore = useSpotifyStore();
      const recommendations = spotifyStore.recommendations;  
      
      const removeTrack = async (trackId) => {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
      });

      if (result.isConfirmed) {
        // Elimina la canción del estado de recomendaciones en el store
        spotifyStore.recommendations = spotifyStore.recommendations.filter(track => track.id !== trackId);

        // Muestra un mensaje de éxito
        Swal.fire(
          'Eliminado',
          'La canción ha sido eliminada de las recomendaciones.',
          'success'
        );
      }
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
        formatDuration,
      };
    },
    methods: {

      async createPlaylist() {
      const spotifyStore = useSpotifyStore();
      const playlistName = 'Nombre de mi Nueva Playlist'; // Obtén el nombre de alguna manera

      try {
        const playlistId = await spotifyStore.createNewPlaylist(playlistName);
        await spotifyStore.addTracksToPlaylist(playlistId, spotifyStore.recommendations);

        // Notificar al usuario de éxito
        // Redirigir o actualizar la interfaz según sea necesario
      } catch (error) {
        console.error('Error al crear la playlist o agregar canciones:', error);
        // Notificar al usuario del error
      }
    },


      handleAudioPlay(event, index) {
      document.querySelectorAll('audio').forEach((audioEl, idx) => {
        if (idx !== index) {
          audioEl.pause();
          audioEl.currentTime = 0;
        }
      });
    },

    openPopup(track) {
      this.selectedTrack = track;
      this.showPopup = true;
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
    width: 50px;
    height: 50px;
    object-fit: cover;
    cursor: pointer; /* Añade cursor pointer para indicar que es clickeable */
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
    height: 30px;
  }
  
  .audio-preview {
    width: 100%;
    height: auto;
  }
  
/* Estilos para el popup */
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-content {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.album-cover-large {
  width: 300px; /* Ajusta según tus necesidades */
  height: 300px; /* Ajusta según tus necesidades */
  object-fit: cover;
  margin-right: 20px;
}

.track-details {
  flex-grow: 1;
  text-align: left;
}
  </style>
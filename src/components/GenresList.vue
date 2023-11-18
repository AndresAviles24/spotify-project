<template>
  <div class="genres-list-container">
    <h2>Géneros Musicales (elegir hasta 5)</h2>
    <select v-if="genres.length > 0" class="form-select" aria-label="Selecciona un género">
      <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
    </select>
    <p v-else>Cargando géneros musicales...</p>
  </div>
</template>

  
  <script>
import { computed, onMounted } from 'vue'; // Importa las funciones necesarias de Vue
import { useRouter } from 'vue-router'; // Importa useRouter de Vue Router para usar la instancia del enrutador
import { useSpotifyStore } from '@/stores/spotifyStore'; // Importa tu store de Pinia

export default {
  name: 'GenresList',
  setup() {
    const spotifyStore = useSpotifyStore();
    const router = useRouter(); // Utiliza useRouter para acceder a la instancia del enrutador

    // Una propiedad computada para reaccionar a los cambios en el estado del store.
    const genres = computed(() => spotifyStore.genres);

    onMounted(async () => {
      if (!spotifyStore.accessToken) {
        // Redirige al login si no hay token de acceso
        router.push('/');
      } else {
        try {
          // Llama a la acción de Pinia para cargar los géneros
          await spotifyStore.fetchGenres();
        } catch (error) {
          console.error('Error cargando los géneros musicales:', error);
          // Maneja el error, como mostrar un mensaje al usuario
        }
      }
    });

    // Hacemos que la propiedad computada 'genres' esté disponible para la plantilla.
    return {
      genres
    };
  }
};
</script>

  
  <style scoped>
  </style>
  
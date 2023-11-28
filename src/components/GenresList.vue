<template>
  <div class="genres-list-container">
    <h2>Géneros Musicales (elegir hasta 5)</h2>
    <div v-if="genres.length > 0" class="genre-selectors">
      <!-- Repeat the select element for the number of genres you want to display -->
      <select
        v-for="(genreOption, index) in selectedGenres"
        v-model="selectedGenres[index]"
        class="form-select"
        :key="index"
        @change="updateSelectedGenres"
      >
        <option value="">Selecciona un género</option>
        <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
      </select>
    </div>
    <p v-else>Cargando géneros musicales...</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useSpotifyStore } from '@/stores/spotifyStore'

export default {
  name: 'GenresList',
  setup() {
    const spotifyStore = useSpotifyStore()
    const selectedGenres = ref(Array(5).fill('')) // Inicializa con 5 géneros vacíos

    // Actualiza el estado de los géneros seleccionados en el store
    const updateSelectedGenres = () => {
      const nonEmptyGenres = selectedGenres.value.filter(Boolean) // Filtra las selecciones vacías
      spotifyStore.updateSelectedGenres(nonEmptyGenres)
    }

    const genres = computed(() => spotifyStore.genres)

    onMounted(async () => {
      if (!spotifyStore.accessToken) {
        // Manejo de la redirección si no hay token
      } else {
        try {
          await spotifyStore.fetchGenres()
        } catch (error) {
          // Manejo de errores
        }
      }
    })

    return {
      genres,
      selectedGenres,
      updateSelectedGenres
    }
  }
}
</script>

<style scoped>
.genre-selectors {
  display: flex;
  gap: 1rem; /* Adjust the gap to match your mockup */
  justify-content: space-between; /* This will space out your dropdowns evenly */
  margin-bottom: 1rem; /* Space below the dropdowns */
}

.form-select {
  flex: 1; /* Each select will take up equal space */
  min-width: 0; /* Overcome the minimum width of flex items in some browsers */
}
</style>

// spotifyStore.js
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import {
  getTopArtists,
  getTopTracks,
  getGenres,
  getRecommendations,
  getUserProfile,
  createPlaylist,
  addTracksToPlaylist,

} from '@/services/spotifyService'

export const useSpotifyStore = defineStore('spotify', {
  state: () => ({
    accessToken: localStorage.getItem('spotify_access_token'),
    refreshToken: null,
    topArtists: [], // Agrega un estado para almacenar los artistas top
    topTracks: [], // Agrega un estado para almacenar las pistas top
    genres: [], // Agrega un estado para almacenar los géneros
    recommendations: [],
    selectedArtists: [], // Almacena los artistas seleccionados
    selectedTracks: [],
    selectedGenres: [] // Almacena los géneros seleccionados
  }),
  getters: {
    combinedSelections: (state) => {
      // Concatena y devuelve los artistas y pistas seleccionados
      return [...state.selectedArtists, ...state.selectedTracks]
    }
  },
  actions: {
    async fetchTopArtists() {
      try {
        const response = await getTopArtists(this.accessToken) // Pasa el token aquí
        this.topArtists = response.data.items
      } catch (error) {
        console.error('Error al obtener los artistas más escuchados:', error)
      }
    },

    async fetchTopTracks() {
      try {
        const response = await getTopTracks(this.accessToken)
        this.topTracks = response.data.items // Asegúrate de actualizar el estado aquí
      } catch (error) {
        console.error('Error al obtener las canciones más escuchadas:', error)
        // Manejo del error
      }
    },

    async fetchGenres() {
      try {
        const response = await getGenres(this.accessToken)
        this.genres = response.data.genres // Asegúrate de actualizar el estado aquí
      } catch (error) {
        console.error('Error al obtener los géneros musicales:', error)
        // Manejo del error
      }
    },

    setToken(newToken) {
      this.accessToken = newToken
      localStorage.setItem('spotify_access_token', newToken)
    },

    clearTokens() {
      this.accessToken = null // Limpia el token del estado
      localStorage.removeItem('spotify_access_token') // Elimina el token del almacenamiento local
      // Realiza acciones adicionales si es necesario
    },

    async fetchRecommendations(options) {
      if (!this.accessToken) {
        console.error('Acceso no autorizado: Token de acceso no disponible.')
        return
      }
      try {
        const response = await getRecommendations(this.accessToken, options)
        this.recommendations = response.data.tracks
      } catch (error) {
        console.error('Error al obtener recomendaciones:', error)
      }
    },

    checkAndLimitSelections() {
      const totalSelections = this.selectedArtists.length + this.selectedTracks.length
      if (totalSelections > 5) {
        // Si se excede el total, ajusta las selecciones de pistas primero y luego las de artistas
        this.selectedTracks = this.selectedTracks.slice(
          0,
          Math.max(5 - this.selectedArtists.length, 0)
        )
        this.selectedArtists = this.selectedArtists.slice(
          0,
          Math.max(5 - this.selectedTracks.length, 0)
        )

        // Alerta de sweetalert2
        Swal.fire({
          title: '¡Demasiadas selecciones!',
          text: 'Solo puedes seleccionar un total combinado de 5 semillas entre artistas y pistas.',
          icon: 'warning',
          confirmButtonText: 'Entendido'
        })
      }
    },

    async createNewPlaylist(playlistName) {
      if (!this.accessToken) {
        console.error('Acceso no autorizado: Token de acceso no disponible.');
        return;
      }

      try {
        const userProfile = await getUserProfile(this.accessToken);
        const userId = userProfile.data.id;
        const playlistResponse = await createPlaylist(this.accessToken, userId, playlistName);
        return playlistResponse.data.id;
      } catch (error) {
        console.error('Error al crear la playlist:', error);
        throw error;
      }
    },

    async addTracksToPlaylist(playlistId, tracks) {
      try {
        await addTracksToPlaylist(this.accessToken, playlistId, tracks);
      } catch (error) {
        console.error('Error al agregar canciones a la playlist:', error);
        throw error;
      }
    },

    updateSelectedArtists(artists) {
      this.selectedArtists = artists
      this.checkAndLimitSelections()
    },
    updateSelectedTracks(tracks) {
      this.selectedTracks = tracks
      this.checkAndLimitSelections()
    },
    updateSelectedGenres(genres) {
      this.selectedGenres = genres
    }
  }
})

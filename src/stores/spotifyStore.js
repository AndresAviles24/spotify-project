// spotifyStore.js
import { defineStore } from 'pinia';
import { getTopArtists, getTopTracks, getGenres } from '@/services/spotifyService';

export const useSpotifyStore = defineStore('spotify', {
  state: () => ({
    accessToken: localStorage.getItem('spotify_access_token'),
    refreshToken: null,
    topArtists: [], // Agrega un estado para almacenar los artistas top
    topTracks: [],  // Agrega un estado para almacenar las pistas top
    genres: [],     // Agrega un estado para almacenar los géneros
  }),
  actions: {

    async fetchTopArtists() {
      try {
        const response = await getTopArtists(this.accessToken); // Pasa el token aquí
        this.topArtists = response.data.items;
      } catch (error) {
        console.error('Error al obtener los artistas más escuchados:', error);
      }
    },
    

    async fetchTopTracks() {
      try {
        const response = await getTopTracks(this.accessToken);
        this.topTracks = response.data.items; // Asegúrate de actualizar el estado aquí
      } catch (error) {
        console.error('Error al obtener las canciones más escuchadas:', error);
        // Manejo del error
      }
    },

    async fetchGenres() {
      try {
        const response = await getGenres(this.accessToken);
        this.genres = response.data.genres; // Asegúrate de actualizar el estado aquí
      } catch (error) {
        console.error('Error al obtener los géneros musicales:', error);
        // Manejo del error
      }
    },

    setToken(newToken) {
      this.accessToken = newToken;
      localStorage.setItem('spotify_access_token', newToken);
    },

    clearTokens() {
      this.accessToken = null; // Limpia el token del estado
      localStorage.removeItem('spotify_access_token'); // Elimina el token del almacenamiento local
      // Realiza acciones adicionales si es necesario
    },
  }
});

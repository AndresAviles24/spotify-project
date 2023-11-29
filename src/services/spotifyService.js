// spotifyService.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Ahora, estas funciones aceptan un token como argumento
const getTopTracks = (token) => {
  return apiClient.get('/me/top/tracks', {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const getTopArtists = (token) => {
  return apiClient.get('/me/top/artists', {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const getGenres = (token) => {
  return apiClient.get('/recommendations/available-genre-seeds', {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const getRecommendations = (token, options) => {
  return apiClient.get('/recommendations', {
    headers: { Authorization: `Bearer ${token}` },
    params: options
  })
}

// Función para crear una playlist
const createPlaylist = (token, userId, playlistName) => {
  return apiClient.post(`/users/${userId}/playlists`, {
    name: playlistName,
    description: 'Nueva playlist creada desde la app',
    public: false
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Función para agregar canciones a la playlist
const addTracksToPlaylist = (token, playlistId, trackUris) => {
  return apiClient.post(`/playlists/${playlistId}/tracks`, {
    uris: trackUris
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export { getTopTracks, getTopArtists, getGenres, getRecommendations, createPlaylist, addTracksToPlaylist };

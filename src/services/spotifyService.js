// spotifyService.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

const getUserProfile = (token) => {
  return apiClient.get('/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
};


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

const createPlaylist = (token, userId, playlistName) => {
  return apiClient.post(
    `/users/${userId}/playlists`,
    {
      name: playlistName,
      description: 'Playlist creada desde mi aplicación de Spotify',
      public: false
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const addTracksToPlaylist = (token, playlistId, tracks) => {
  const uris = tracks.map(track => track.uri);
  return apiClient.post(
    `/playlists/${playlistId}/tracks`,
    { uris },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};


export {
  getTopTracks,
  getTopArtists,
  getGenres,
  getRecommendations,
  getUserProfile,
  addTracksToPlaylist,
  createPlaylist
}

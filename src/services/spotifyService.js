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

export { getTopTracks, getTopArtists, getGenres, getRecommendations }

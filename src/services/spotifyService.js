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

const getRecommendations = (token, seedArtists, seedTracks, seedGenres, limit) => {
  const params = new URLSearchParams({
    seed_artists: seedArtists.join(','),
    seed_tracks: seedTracks.join(','),
    seed_genres: seedGenres.join(','),
    limit
  })

  return apiClient.get(`/recommendations?${params}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export { getTopTracks, getTopArtists, getGenres, getRecommendations }

// spotifyService.js
/*
import axios from 'axios';
import { useSpotifyStore } from '@/stores/spotifyStore';

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const store = useSpotifyStore();
  config.headers['Authorization'] = `Bearer ${store.accessToken}`;
  return config;
});

const getTopTracks = () => {
  return apiClient.get('/me/top/tracks');
};

const getTopArtists = () => {
  return apiClient.get('/me/top/artists');
};

const getGenres = () => {
  return apiClient.get('/recommendations/available-genre-seeds');
};

export { getTopTracks, getTopArtists, getGenres };
*/
// spotifyService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ahora, estas funciones aceptan un token como argumento
const getTopTracks = (token) => {
  return apiClient.get('/me/top/tracks', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

const getTopArtists = (token) => {
  return apiClient.get('/me/top/artists', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

const getGenres = (token) => {
  return apiClient.get('/recommendations/available-genre-seeds', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export { getTopTracks, getTopArtists, getGenres };

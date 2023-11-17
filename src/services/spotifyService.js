// spotifyService.js
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

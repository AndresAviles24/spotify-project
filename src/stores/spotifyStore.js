// spotifyStore.js
import { defineStore } from 'pinia';
import { getToken } from '@/services/auth';

export const useSpotifyStore = defineStore('spotify', {
  state: () => ({
    accessToken: null,
    refreshToken: null
  }),
  actions: {
    async authenticate(code) {
      const data = await getToken(code);
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
    }
  }
});

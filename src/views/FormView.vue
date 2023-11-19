<template>
  <div class="dashboard-container">
    <app-header />
    <h1>Tu Dashboard de Spotify</h1>
    <top-artists v-if="authorized" />
    <top-tracks v-if="authorized" />
    <genres-list v-if="authorized" />
    <p v-else>Autorizando...</p>
    <app-footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSpotifyStore } from '@/stores/spotifyStore';
import { getToken } from '@/services/auth';
import TopArtists from '@/components/TopArtists.vue';
import TopTracks from '@/components/TopTracks.vue';
import GenresList from '@/components/GenresList.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  components: {
    TopArtists,
    TopTracks,
    GenresList,
    AppHeader,
    AppFooter,
    
  },
  setup() {
    const authorized = ref(false);
    const route = useRoute();
    const router = useRouter();
    const spotifyStore = useSpotifyStore();

    onMounted(async () => {
      const code = route.query.code;
      if (code && !spotifyStore.accessToken) {
        try {
          const tokenData = await getToken(code);
          spotifyStore.setToken(tokenData.access_token);
          authorized.value = true; // actualiza la propiedad reactiva
        } catch (error) {
          console.error('Error al obtener el token:', error);
          router.push('/'); // usa useRouter para navegar
        }
      } else if (spotifyStore.accessToken) {
        authorized.value = true; // usuario ya está autorizado
      }
    });

    return {
      authorized
    };
  }
};
</script>

<style scoped>
</style>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Sugerencias de playlists de Spotify</h1>
      <button class="login-btn" @click="loginWithSpotify">
        Iniciar sesión con Spotify
      </button>
    </div>
  </div>
</template>

<script>
import { getAuthUrl } from '@/services/auth'

export default {
  methods: {
    loginWithSpotify() {
      window.location.href = getAuthUrl()
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.login-box {
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.login-btn {
  background-color: #1db954;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #1ed760;
}
</style>

<template>
    <div class="login-container">
      <h1>Bienvenido a la Aplicación Spotify</h1>
      <button @click="loginWithSpotify">Iniciar sesión con Spotify</button>
    </div>
  </template>
  
  <script>
  import { getAuthUrl } from '@/services/auth';
  
  export default {
    name: 'Login',
    methods: {
      loginWithSpotify() {
        window.location.href = getAuthUrl();
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  
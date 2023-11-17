// auth.js
import axios from 'axios';

const CLIENT_ID = import.meta.env.VUE_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VUE_APP_SPOTIFY_REDIRECT_URI;

const getAuthUrl = () => {
  const scope = 'user-top-read';
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&response_type=code&show_dialog=true`;
};

const getToken = async (code) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);

  const response = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${import.meta.env.VUE_APP_SPOTIFY_CLIENT_SECRET}`)
    }
  });

  return response.data;
};

export { getAuthUrl, getToken };

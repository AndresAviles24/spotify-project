// auth.js
/*
import axios from 'axios'

const CLIENT_ID = 'a5344dfe5f4947b6933c3c9d623f1f79'
const REDIRECT_URI = 'http://localhost:5173/form'

const getAuthUrl = () => {
  const scope = 'user-top-read'
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&response_type=code&show_dialog=true`
}

const getToken = async (code) => {
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', REDIRECT_URI)

  const response = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${CLIENT_ID}:28ff856aa98b44f0808a852548f7b9fa`) //Client secret
    }
  })

  return response.data
}

export { getAuthUrl, getToken }
*/
import axios from 'axios'

const CLIENT_ID = 'a5344dfe5f4947b6933c3c9d623f1f79'
const REDIRECT_URI = 'http://localhost:5173/form'

const getAuthUrl = () => {
  // Agrega el scope 'playlist-modify-public' junto con los otros scopes necesarios separados por espacios
  const scope = encodeURIComponent('user-top-read playlist-modify-private');
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${scope}&response_type=code&show_dialog=true`
}

const getToken = async (code) => {
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', REDIRECT_URI)

  const response = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Asegúrate de reemplazar CLIENT_SECRET con tu client secret real
      Authorization: `Basic ${btoa(`${CLIENT_ID}:28ff856aa98b44f0808a852548f7b9fa`)}`
    }
  })

  return response.data
}

export { getAuthUrl, getToken }
const API_URL = 'https://api.verdict.com/api/admin/'

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: API_URL + 'login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

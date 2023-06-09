import { API_URL } from '../../Client/request'

export default {
  meEndpoint: '/auth/me',
  adminLoginEndpoint: API_URL + 'login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}

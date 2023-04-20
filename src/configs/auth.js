import { API_URL } from '../../Client/request'

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: API_URL + 'login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

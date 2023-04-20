// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import moment from 'moment/moment'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  getAuthToken: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      const storedToken1 = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const storedToken2 = JSON.parse(storedToken1)
      const userDataCheck = window.localStorage.getItem('userData')
      console.log(userDataCheck)
      if (storedToken2) {
        setLoading(true)
        if (isLoggedIn()) {
          setUser(JSON.parse(userDataCheck))
        } else {
          console.log('Logout due to token expiry!')
          handleLogout()
        }
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, { username: params.userName, password: params.password })
      .then(async response => {
        console.log(response)
        if (response.data.responseCode != 2000) {
          return errorCallback('userName')
        }
        const res = response.data.response

        const userData = {
          userName: res.adminUsername,
          name: res.adminName,
          role: res.isSuperAdmin ? 'superadmin' : 'admin'
        }

        const tokenData = {
          token: response.data.response.accesstoken.token,
          expiry: response.data.response.accesstoken.expiry
        }
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, JSON.stringify(tokenData))
          : null
        const returnUrl = router.query.returnUrl
        setUser(userData)
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(userData)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        console.log(err)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }

  const getAuthToken = () => {
    const tokenData = window.localStorage.getItem(authConfig.storageTokenKeyName)
      ? window.localStorage.getItem(authConfig.storageTokenKeyName)
      : null
    const tokenParse = JSON.parse(tokenData)

    return tokenData ? tokenParse.token : null
  }

  function isLoggedIn() {
    return moment().isBefore(getExpirationAccessToken())
  }

  function isLoggedOut() {
    return !this.isLoggedIn()
  }

  function getExpirationAccessToken() {
    const expiration1 = localStorage.getItem(authConfig.storageTokenKeyName)
    const expiration = JSON.parse(expiration1)
    if (expiration1) {
      const expiresAt = expiration.expiry || '{}'

      return moment(expiresAt)
    } else {
      return null
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    getAuthToken: getAuthToken
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

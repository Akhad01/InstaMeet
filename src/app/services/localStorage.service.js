const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'

export function setToken({ refreshToken, idToken, expiresIn = 3600 }) {
  const expiresData = new Date().getTime() + expiresIn * 1000

  localStorage.setItem(TOKEN_KEY, idToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresData)
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}

export function getTokenDate() {
  return localStorage.getItem(EXPIRES_KEY)
}

const localStorageService = {
  setToken,
}

export default localStorageService

const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'

export function setToken({
  refreshToken,
  accessToken,
  userId,
  expiresIn = 3600,
}) {
  const expiresData = new Date().getTime() + expiresIn * 1000

  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresData)
  localStorage.setItem(USERID_KEY, userId)
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

export function getUserId() {
  return localStorage.getItem(USERID_KEY)
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(USERID_KEY)
}

const localStorageService = {
  setToken,
  getAccessToken,
  getRefreshToken,
  getTokenDate,
  getUserId,
  deleteToken,
}

export default localStorageService

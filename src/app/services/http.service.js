import axios from 'axios'
import { toast } from 'react-toastify'

import configFile from '../config.json'
import localStorageService from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
  baseURL: configFile.apiEndpoint,
})

http.defaults.baseURL = configFile.apiEndpoint

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenDate()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = refreshToken && expiresDate < Date.now()

    if (configFile.isFireBase) {
      const containSlash = /\/$/.test(config.url)

      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'

      if (isExpired) {
        const data = authService.refresh()

        localStorageService.setToken({
          refreshToken: data.refresh_token,
          accessToken: data.accessToken,
          userId: data.userId,
          expiresIn: data.expires_in,
        })
      }

      const asseccToken = localStorageService.getAccessToken()

      if (asseccToken) {
        config.params = { ...config.params, auth: asseccToken }
      }
    } else {
      if (isExpired) {
        const data = authService.refresh()

        localStorageService.setToken(data)
      }

      const asseccToken = localStorageService.getAccessToken()

      if (asseccToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${asseccToken}`,
        }
      }
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data
}

http.interceptors.response.use(
  (res) => {
    res.data = { content: transformData(res.data) }
    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedErrors) {
      toast.error('Somthing was wrong. Try it later')
    }

    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  put: http.put,
  post: http.post,
  delete: http.delete,
  patch: http.patch,
}

export default httpService

import axios from 'axios'
import { toast } from 'react-toastify'

import configFile from '../config.json'
import { httpAuth } from '../../hooks/useAuth'
import localStorageService from './localStorage.service'

const http = axios.create({
  baseURL: configFile.apiEndpoint,
})

http.defaults.baseURL = configFile.apiEndpoint

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/.test(config.url)

      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'

      const expiresDate = localStorageService.getTokenDate()
      const refreshToken = localStorageService.getRefreshToken()

      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post('token', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        })

        localStorageService.setToken({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          localId: data.user_id,
          expiresIn: data.expires_in,
        })
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
      console.log(error)

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
}

export default httpService

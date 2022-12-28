import axios from "axios"
import useUserStore from "../stores/useUserStore"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND

const axiosInterceptor = (baseURL) => {
  const instance = axios.create({ baseURL })
  instance.interceptors.request.use(
    async function (config) {
      const { authToken } = useUserStore.getState()

      if (!config.headers) config.headers = {}

      if (authToken) config.headers["Authorization"] = `Bearer ${authToken}`
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    function (res) {
      return res
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  return instance
}

const APIService = axiosInterceptor(BACKEND_URL + "/api")

// const meFetcher = async (url) => {
//   try {
//     const { data } = await APIService.get(url)
//     return data
//   } catch (error) {
//     throw error
//   }
// }

const fetcher = async (url) => {
  try {
    const { data } = await APIService.get(url)
    return data
  } catch (error) {
    throw error
  }
}

export { APIService, fetcher }

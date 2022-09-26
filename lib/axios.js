import axios from "axios"
import useUserStore from "../stores/useUserStore"

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
      console.log(res, "res interceptor")

      return res
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    }
  )

  return instance
}

const APIService = axiosInterceptor("http://localhost:4000/api")

const meFetcher = async (url) => {
  try {
    const { data } = await APIService.get(url)
    return data
  } catch (error) {
    throw error
  }
}

const branchFetcher = async (url) => {
  try {
    const { data } = await APIService.get(url)
    return data
  } catch (error) {
    throw error
  }
}

export { APIService, meFetcher, branchFetcher }

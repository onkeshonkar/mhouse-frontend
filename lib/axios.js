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

export { APIService, meFetcher }

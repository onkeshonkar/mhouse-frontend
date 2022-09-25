import useSWR from "swr"
import useUserStore from "../stores/useUserStore"

import { meFetcher } from "../lib/axios"

const useUser = () => {
  const authToken = useUserStore((store) => store.authToken)

  const { data, error, mutate } = useSWR(
    authToken ? "v1/user/me" : null,
    meFetcher
  )
  const loading = !data && !!error

  return {
    loading,
    user: data?.user,
    error,
    mutate,
  }
}

export default useUser

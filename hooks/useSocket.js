import { useEffect } from "react"
import { io } from "socket.io-client"

import useUserStore from "../stores/useUserStore"

const URL = process.env.NEXT_PUBLIC_BACKEND

const socket = io(URL, { autoConnect: false })

const useSocket = () => {
  const authToken = useUserStore((store) => store.authToken)

  if (!socket.connected) {
    socket.auth = { token: authToken }
    socket.connect()
    socket.on("connect", () => {
      console.log("Socket connected", socket.id)
    })

    socket.on("connect_error", () => {
      console.error("Error connecting socket")
      // socket.disconnect()
      socket.connect()
    })

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected", reason)
    })
  }

  return socket
}

export default useSocket

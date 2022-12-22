import { io } from "socket.io-client"

const URL = "http://localhost:4000"
const socket = io(URL)

export default socket

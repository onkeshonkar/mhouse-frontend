import Spinner from "../components/ui/Spinner"
import useUserStore from "../stores/useUserStore"

import { useEffect } from "react"
import { useRouter } from "next/router"

const Tasks = () => {
  return (
    <div className="mt-2 ml-2">
      <div className="text-center py-10">
        <h1>Task is in progress</h1>
      </div>
    </div>
  )
}

export default Tasks

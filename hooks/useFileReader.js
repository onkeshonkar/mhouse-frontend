import { useState } from "react"

const useFileReader = (accept = null) => {
  const [file, setFile] = useState("")

  const onSelect = () => {
    let input = document.createElement("input")
    input.type = "file"
    if (accept) input.accept = accept

    input.onchange = (_) => {
      let files = Array.from(input.files)
      if (files && files.length) {
        // const filename = files[0].name
        // console.log(filename)
        setFile(files[0])
      }
    }
    input.click()
  }

  const onDiscard = () => setFile("")

  return { file, onSelect, onDiscard }
}

export default useFileReader

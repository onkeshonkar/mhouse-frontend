import Image from "next/image"
import useFileReader from "../../../hooks/useFileReader"
import { Camera } from "../../icons"

const Resume = () => {
  const { file, onSelect, onDiscard } = useFileReader(
    "image/png, image/jpg, image/jpeg, application/pdf"
  )

  return (
    <div className="px-2 mt-6 flex flex-col items-center gap-5">
      <div className="self-start">List of Uploads</div>

      <div
        onClick={onSelect}
        className="flex flex-col items-center justify-center content-center w-28 h-28 bg-background rounded-2xl relative cursor-pointer "
      >
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt="profile pic"
            width={192}
            height={192}
            objectFit="cover"
            className="rounded-2xl"
          />
        )}
        <div
          className={`${
            file ? "opacity-0 " : ""
          } absolute flex flex-col items-center justify-center content-center inset-0 hover:opacity-100`}
        >
          <button>
            <Camera width={30} height={30} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="self-end mt-10">
        <button
          onClick={onSelect}
          className="text-white text-sm font-normal bg-gradient-to-tr from-[#FF974A] to-[#FFBA42] py-2 px-4 rounded-lg"
        >
          Add Resume
        </button>
      </div>
    </div>
  )
}

export default Resume

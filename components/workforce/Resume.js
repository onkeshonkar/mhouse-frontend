import { Arrow, Close, Camera } from "../icons"
import useAddEmpStore from "../../stores/useAddEmpStore"
import Button from "../ui/Button"

import useFileReader from "../../hooks/useFileReader"
import { useMemo, useState } from "react"
import Avatar from "../ui/Avatar"

const Resume = ({ onBack, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false)

  const emp = useAddEmpStore((store) => store.emp)
  const updateEmp = useAddEmpStore((store) => store.updateEmp)

  const { file, onDiscard, onSelect } = useFileReader(
    "image/png, image/jpg, image/jpeg, application/pdf"
  )

  const resume = useMemo(() => {
    if (file) return file
    if (emp.resume) {
      return emp.resume
    }
    return ""
  }, [file, emp])

  const handleSubmit = async () => {
    updateEmp({ resume })
    setLoading(true)

    await onSubmit()

    setLoading(false)
  }
  return (
    <div className="max-w-8xl min-h-screen flex flex-col relative">
      <button onClick={onCancel} className="absolute right-0 mt-20">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold my-20">Upload Resume If Found</h2>

      <div className="flex flex-wrap gap-7 items-center justify-center h-[340px]">
        <div className="flex flex-col items-center justify-center content-center w-48 h-48 bg-background rounded-2xl relative cursor-pointer ">
          {resume && resume.type.split("/")[0] === "image" && (
            <Avatar
              user={{ avatar: URL.createObjectURL(resume) }}
              height={192}
              width={192}
              className="rounded-2xl"
            />
          )}
          <div
            className={`${
              resume ? "opacity-0 " : ""
            } absolute flex flex-col items-center justify-center content-center inset-0 hover:opacity-100`}
          >
            <button onClick={onSelect}>
              <Camera width={48} height={48} className="text-gray-700" />
            </button>
            {!resume && (
              <>
                <span className="text-gray-700">Upload Image</span>
                <span className="text-gray-700">(optional) </span>
              </>
            )}
          </div>
          {resume && (
            <button
              onClick={onDiscard}
              className="absolute top-10 right-5 bg-gray-100 bg-opacity-30 p-0.5 text-red-600 rounded-full  hidden group-hover:flex "
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-24 w-laptop">
        <Button onClick={onBack} className="bg-primary" gradient={false}>
          <Arrow
            width={20}
            height={20}
            className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
          />
          <span> Back</span>
        </Button>

        <span>
          <svg
            width="400"
            height="12"
            viewBox="0 0 400 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 11.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="28" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="74.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 74.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="91" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="137.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 137.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="154" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="200.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 200.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="217" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="263.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 263.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="280" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="326.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 326.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="343" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="389.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 389.01 6.01)"
              fill="#FFC34A"
            />
          </svg>
        </span>

        <Button onClick={handleSubmit} loading={loading}>
          <span>Finish</span>
          <Arrow
            width={20}
            height={20}
            className="ml-6 group-hover:translate-x-1 duration-300"
          />
        </Button>
      </div>
    </div>
  )
}

export default Resume

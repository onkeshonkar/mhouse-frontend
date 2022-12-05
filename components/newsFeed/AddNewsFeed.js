import { useMemo, useState } from "react"

import useFileReader from "../../hooks/useFileReader"
import useUserStore from "../../stores/useUserStore"
import { Arrow, Camera } from "../icons"
import Avatar from "../ui/Avatar"
import Button from "../ui/Button"
import DepartmentList from "../ui/DepartmentList"
import Input from "../ui/Input"
import Modal from "../ui/Modal"
import TextArea from "../ui/TextArea"

const AddNewsFeed = ({ onClose }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")
  const [dep, setDep] = useState()
  const [branch, setBranch] = useState()

  const { file, onDiscard, onSelect } = useFileReader(
    "image/png, image/jpg, image/jpeg, video/mp4, video/x-m4v, video/*"
  )

  const avatar = useMemo(() => {
    if (file) return file

    return ""
  }, [file])

  const handleSubmit = () => {
    onClose()
  }

  return (
    <Modal open={true} setOpen={onClose}>
      <div className="px-16 py-12 bg-white rounded-2xl">
        <h3 className="text-4xl leading-6 font-medium mb-14">
          New Announcement
        </h3>

        <div className="flex flex-col gap-6">
          <div className="flex gap-8 items-center ">
            <div className="flex flex-col items-center justify-center content-center w-36 h-36 bg-background rounded-2xl relative cursor-pointer group">
              {avatar && (
                <Avatar
                  user={{ avatar: URL.createObjectURL(avatar) }}
                  height={192}
                  width={192}
                  className="rounded-2xl"
                />
              )}
              <div
                className={`${
                  avatar ? "opacity-0 " : ""
                } absolute flex flex-col gap-1 items-center justify-center content-center inset-0 hover:opacity-100 px-10`}
              >
                <button onClick={onSelect}>
                  <Camera width={48} height={48} className="text-gray-700" />
                </button>
                {!avatar && (
                  <>
                    <span className="text-gray-700 text-xs">
                      JPG, PNG, MP4, VLC,..etc
                    </span>
                    <span className="text-gray-700 text-xs">(optional)</span>
                  </>
                )}
              </div>
              {avatar && (
                <button
                  onClick={onDiscard}
                  className="absolute top-10 right-5 bg-gray-100 bg-opacity-30 p-0.5 text-red-600 rounded-full  hidden group-hover:flex "
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Input
                type="text"
                label="Title"
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="flex gap-6">
                <div className="bg-background rounded-2xl h-12 relative focus-within:ring-1 flex items-center w-60">
                  <span className=" text-sm px-6 pb-0 pt-3">
                    {selectedBranch.name}
                  </span>

                  <label className="absolute text-xs opacity-50 left-6 top-1">
                    Branch
                  </label>
                </div>
                <DepartmentList value={dep} onChange={setDep} />
              </div>
            </div>
          </div>

          <div className="relative">
            <TextArea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              label={"Write announcement here..."}
              className="w-full"
              rows={8}
              maxlength={1000}
            />

            <div className="absolute text-sm opacity-50 right-3 bottom-3">
              <span>{notes.length}</span>
              <span>/</span>
              <span>1000</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-16">
          <Button onClick={onClose} className="bg-primary" gradient={false}>
            <Arrow
              width={20}
              height={20}
              className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
            />
            <span>Back</span>
          </Button>

          <Button onClick={handleSubmit}>
            <span>Publish</span>
            <Arrow
              width={20}
              height={20}
              className="ml-6 group-hover:translate-x-1 duration-300"
            />
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddNewsFeed

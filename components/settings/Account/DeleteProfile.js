import toast from "react-hot-toast"

import useUserStore from "../../../stores/useUserStore"

const DeleteProfile = () => {
  const user = useUserStore((store) => store.user)

  const deleteProfile = () => {
    console.log("Profile will be deleted")
    toast.error("Feature Not Active NOW!")
  }

  return (
    <div className="bg-white flex w-full justify-between items-center px-9 py-6 rounded-2xl">
      <span className="text-base font-medium text-x-red">
        By Delete Account you Agree to remove all data for all users from our
        site, you can back within 14 Days only
      </span>

      <button
        onClick={deleteProfile}
        className="text-base text-white py-3 px-6 font-semibold bg-x-red rounded-xl"
      >
        Delete Account
      </button>
    </div>
  )
}

export default DeleteProfile

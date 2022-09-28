import useUserStore from "../../../stores/useUserStore"
import BankDetails from "./BankDetails"
import DeleteProfile from "./DeleteProfile"
import Profile from "./Profile"
import Restaurent from "./Restaurent"
import TimeCurrency from "./TimeCurrency"
import UpdatePassword from "./UpdatePassword"

const Account = () => {
  const user = useUserStore((store) => store.user)
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  return (
    <div className="flex flex-col gap-4">
      <Profile />
      <UpdatePassword />
      {(user.type === "OWNER" || user.type === "MANAGER") && <BankDetails />}

      {/* Permission managed inside the component */}
      <Restaurent />

      {(user.type === "OWNER" || user.type === "MANAGER") && <TimeCurrency />}
      {user.type === "OWNER" && selectedBranch.isMainBranch && (
        <DeleteProfile />
      )}
    </div>
  )
}

export default Account

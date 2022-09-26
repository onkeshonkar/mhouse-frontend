import BankDetails from "./BankDetails"
import DeleteProfile from "./DeleteProfile"
import Profile from "./Profile"
import Restaurent from "./Restaurent"
import TimeCurrency from "./TimeCurrency"
import UpdatePassword from "./UpdatePassword"

const Account = () => {
  return (
    <div className="flex flex-col gap-4">
      <Profile />
      <UpdatePassword />
      <BankDetails />
      <Restaurent />
      <TimeCurrency />
      <DeleteProfile />
    </div>
  )
}

export default Account

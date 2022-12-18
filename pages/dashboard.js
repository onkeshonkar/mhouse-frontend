import AdminDashboard from "../components/dashboard/admin/AdminDashboard"
import StaffDashBoard from "../components/dashboard/staff/StaffDashBoard"
import useUserStore from "../stores/useUserStore"

const Dashboard = () => {
  const user = useUserStore((store) => store.user)

  return (
    <div className="mt-8 ml-6">
      {user.type === "OWNER" ? <AdminDashboard /> : <StaffDashBoard />}
    </div>
  )
}

export default Dashboard

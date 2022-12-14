import { useState } from "react"
import toast from "react-hot-toast"
import { APIService } from "../../../lib/axios"
import useAddEmpStore from "../../../stores/useAddEmpStore"
import useUserStore from "../../../stores/useUserStore"

import Modal from "../../ui/Modal"
import BasicInfo from "../BasicInfo"
import EmergencyContact from "../EmergencyContact"
import Experience from "../Experience"
import JobDetails from "../JobDetails"
import Resume from "../Resume"
import VisaPayroll from "../VisaPayroll"
import WorkSlot from "../WorkSlot"

const AddEmpModal = ({ onCancel }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const emp = useAddEmpStore((store) => store.emp)
  const clearEmpStore = useAddEmpStore((store) => store.clearEmpStore)

  const uploadDocs = async (empId) => {
    console.log(empId, "empId")
    let formData = new FormData()
    formData.append("avatar", emp.avatar)
    formData.append("resume", emp.resume)
    formData.append("logo", emp.experience?.logo)
    formData.append("employeeId", empId)

    await APIService.post(`/v1/uploads//employee-docs`, formData)
  }

  const addEmployee = async () => {
    const empData = {
      fullName: emp.fullName,
      dateOfBirth: emp.dateOfBirth,
      gender: emp.gender,
      phoneNumber: emp.phoneNumber,
      email: emp.email,
      fullAddress: emp.fullAddress,
      branch: selectedBranch.id,
      department: emp.department,
      jobTitle: emp.jobTitle,
      employementType: emp.employementType,
      tenure: {
        period: emp.tenure.period,
        duration: emp.tenure.duration,
      },
      visa: {
        type: emp.visa.type,
        ...(emp.visa.expiryDate && { expiryDate: emp.visa.expiryDate }),
      },
      payrollGroup: emp.payrollGroup.id,
      workSlot: emp.workSlot,
      emergencyContact: {
        fullName: emp.emergencyContact.fullName,
        phoneNumber: emp.emergencyContact.phoneNumber,
        relation: emp.emergencyContact.relation,
      },
    }

    if (emp.experience) {
      const { companyName, department, jobTitle, startDate, endDate } =
        emp.experience
      empData.experience = {
        ...(companyName && { companyName }),
        ...(department && { department }),
        ...(jobTitle && { jobTitle }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      }
    }

    const res = await APIService.post(
      `/v1/branches/${selectedBranch.id}/employees`,
      empData
    )

    return res.data.employee
    //   toast.success("Emplyoyee Added")
    //   return newEmp
    // } catch (error) {
    //   const { message } = error?.response?.data || error
    //   toast.error(message, { duration: 7000 })
    //   console.log(error)
    // }
  }

  const onSubmit = async () => {
    try {
      const employee = await addEmployee()
      toast.success("Emplyoyee Added")
      await uploadDocs(employee.id)
      clearEmpStore()
      toast.success("Emplyoyee docs uploaded")
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }

    onCancel()
  }

  return (
    <Modal open={true} setOpen={() => {}} transparent={false}>
      {currentPage === 1 && (
        <BasicInfo
          onBack={onCancel}
          onCancel={onCancel}
          onNext={() => setCurrentPage(2)}
        />
      )}

      {currentPage === 2 && (
        <JobDetails
          onBack={() => setCurrentPage(1)}
          onCancel={onCancel}
          onNext={() => setCurrentPage(3)}
        />
      )}

      {currentPage === 3 && (
        <VisaPayroll
          onBack={() => setCurrentPage(2)}
          onCancel={onCancel}
          onNext={() => setCurrentPage(4)}
        />
      )}

      {currentPage === 4 && (
        <WorkSlot
          onBack={() => setCurrentPage(3)}
          onCancel={onCancel}
          onNext={() => setCurrentPage(5)}
        />
      )}

      {currentPage === 5 && (
        <EmergencyContact
          onBack={() => setCurrentPage(4)}
          onCancel={onCancel}
          onNext={() => setCurrentPage(6)}
        />
      )}

      {currentPage === 6 && (
        <Experience
          onBack={() => setCurrentPage(5)}
          onCancel={onCancel}
          onNext={() => setCurrentPage(7)}
        />
      )}

      {currentPage === 7 && (
        <Resume
          onBack={() => setCurrentPage(6)}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  )
}

export default AddEmpModal

import Modal from "./Modal"

const ConfirmModal = ({ onClose, message, onConfirm }) => {
  const onSubmit = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal open={true} setOpen={onClose}>
      <div className="px-9 py-12 bg-white rounded-2xl">
        <h3 className="text-4xl leading-6 font-medium">
          {message || "Are You Sure Want to Delete ?"}
        </h3>

        <div className="flex justify-between mt-16">
          <button
            onClick={onClose}
            className="text-base text-white py-3 px-7 font-semibold bg-x-green rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="text-base text-white py-3 px-7 font-semibold bg-x-red rounded-xl"
          >
            Sure
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal

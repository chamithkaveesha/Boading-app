import Modal from "../SubComponents/Modal";

function AddMemberPopup({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold">Add Member</h2>
      <form className="mt-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
            focus:ring-1"
          />
          <div>
            {/* dispaly searched names here */}
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddMemberPopup;
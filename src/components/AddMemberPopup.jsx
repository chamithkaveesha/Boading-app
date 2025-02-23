import { useState } from "react";
import { addUserToRoom } from "../api/adduserToRoom"; // Adjust the path as necessary
import Modal from "../SubComponents/Modal";

function AddMemberPopup({ isOpen, onClose, token, room, onMemberCreated }) {

  if (!room) {
    return null; // Prevent rendering if room is undefined
  }

  const [memberName, setMemberName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddMember = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setError("");

    if (!memberName) {
      setError("Please enter a name.");
      return;
    }

    setLoading(true);

    try {
      const newMember = await addUserToRoom(room.id, { name: memberName, isRegistered: false }, token);
      onMemberCreated(newMember); // Callback to update UI
      onClose(); // Close modal
    } catch (error) {
      setError(error || "Error adding member. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold text-black">Add Member To {room.name}</h2>

      <form className="mt-4" onSubmit={handleAddMember}>
        <div className="mb-4 text-gray-700">
          <label htmlFor="name" className="block text-sm font-medium">
            Member Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter member name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddMemberPopup;

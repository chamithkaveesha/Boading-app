import { useState } from "react";
import { createRoom } from "../api/createRoom"; 
import Modal from "../SubComponents/Modal";

function AddRoomPopup({ isOpen, onClose, token, onRoomCreated }) {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateRoom = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setError("");
    
    if (!roomName) {
      setError("Please enter a room name.");
      return;
    }

    setLoading(true);

    try {
      const newRoom = await createRoom({ name: roomName }, token); // Use the createRoom function
      onRoomCreated(newRoom); // Callback to update UI
      onClose(); // Close modal
    } catch (error) {
      setError(error || "Error creating room. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl text-black font-semibold">Create Room</h2>

      <form className="mt-4" onSubmit={handleCreateRoom}>
        <div className="mb-4 text-gray-700">
          <label htmlFor="name" className="block text-sm font-medium">
            Room Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter room name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
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
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddRoomPopup;

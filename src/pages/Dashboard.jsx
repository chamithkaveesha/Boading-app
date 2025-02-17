import React, { useState } from "react";
import RoomTable from "../components/RoomTable";
import AddMemberPopup from "../components/AddMemberPopup";

const rooms = [
    { roomName: "room1", id: 1, members: ["member1", "member2", "member3"], balances: [1, 2, 3] },
    { roomName: "room2", id: 2, members: ["member1", "member2", "member3"], balances: [1, 2, 3] }
];

function Dashboard() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [newRoomName, setRoomName] = useState(""); 
    const [members, setMembers] = useState([]);

    const handleSearchingMembers = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddMembers = (member) => {    
        setMembers([...members, member]);
    };
    
    const handleCreateRoom = () => {
        if (newRoomName && members.length > 0) {
            // implement the create room logic here
            
        } else {
            alert("Please provide a room name and add at least one member.");
        }
    };

    const handleRoomName = (event) => {
        setRoomName(event.target.value);
    };

    return (
        <div className="">
            <div className="flex flex-col justify-between items-center">
                {/* Rendering each room as a table */}
                {rooms.map((room) => (
                    <RoomTable key={room.id} room={room} />
                ))}
        
                {/* Section for adding a new room */}
                <section className="mt-8 w-full max-w-md bg-green-100 p-4 rounded">
                    <h3 className="text-lg font-bold mb-4">Create a New Room</h3>
                    <div className="mb-4">
                        <label className="block mb-2">Room Name</label>
                        <input 
                            type="text" 
                            onChange={handleRoomName} 
                            value={newRoomName} 
                            className="w-full p-2 border rounded" 
                            placeholder="Enter room name" 
                        />
                    </div>
                    <div className="mb-4">
                        <button 
                            onClick={() => setPopupOpen(true)} 
                            className="block mb-2 bg-green-500 rounded p-2 cursor-pointer"
                        >
                            Add Member
                        </button>
                        
                        {/* Add member popup */}
                        <AddMemberPopup 
                            isOpen={isPopupOpen} 
                            onClose={() => setPopupOpen(false)} 
                            handleAddMembers={handleAddMembers}
                        />

                        <div>
                            {/* Display added members */}
                            <ul>
                                {members.map((member, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        {member} 
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleCreateRoom} 
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Create Room
                    </button>
                </section>
            </div>
    
            {/* Section for floating buttons */}
            <section className="relative">
                {/* Absolute positioning for the floating buttons */}
                <section className="fixed bottom-8 space-y-4 z-50">
                  <div className="fixed right-8">
                    <button className="bg-green-400 rounded-full px-6 py-3 shadow-lg hover:bg-green-500 transition duration-300">
                        Do a Transaction
                    </button>
                  </div>
                  <div>
                    <button className="bg-green-400 rounded-full px-6 py-3 shadow-lg hover:bg-green-500 transition duration-300">
                        Transaction Log
                    </button>
                  </div>
                </section>
            </section>
        </div>
    );
}

export default Dashboard;

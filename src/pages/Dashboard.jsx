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
        <div className="min-h-screen w-full bg-gray-50 p-3 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Manage your rooms and members</p>
                </div>

                <div className="flex flex-col gap-6 sm:gap-8">
                    {/* Rendering each room as a table */}
                    <div className="space-y-4 sm:space-y-6">
                        {rooms.map((room) => (
                            <RoomTable key={room.id} room={room} />
                        ))}
                    </div>
            
                    {/* Section for adding a new room */}
                    <section className="w-full max-w-md mx-auto lg:max-w-lg bg-white border border-gray-200 p-4 sm:p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800">Create a New Room</h3>
                        <div className="mb-4 sm:mb-6">
                            <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">Room Name</label>
                            <input 
                                type="text" 
                                onChange={handleRoomName} 
                                value={newRoomName} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base" 
                                placeholder="Enter room name" 
                            />
                        </div>
                        <div className="mb-4 sm:mb-6">
                            <button 
                                onClick={() => setPopupOpen(true)} 
                                className="w-full sm:w-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg px-4 py-3 font-medium hover:from-green-600 hover:to-green-700 transition duration-200 text-sm sm:text-base"
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
                                {members.length > 0 && (
                                    <div className="mt-3 sm:mt-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Added Members:</h4>
                                        <ul className="space-y-2">
                                            {members.map((member, index) => (
                                                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 sm:p-3 rounded-lg">
                                                    <span className="text-sm sm:text-base">{member}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <button 
                            onClick={handleCreateRoom} 
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition duration-200 text-sm sm:text-base"
                        >
                            Create Room
                        </button>
                    </section>
                </div>
            </div>
    
            {/* Section for floating buttons */}
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 flex flex-col gap-3 z-50">
                <button className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full px-4 py-3 sm:px-6 sm:py-3 shadow-lg hover:from-green-500 hover:to-green-600 transition duration-300 text-xs sm:text-sm font-medium">
                    Do a Transaction
                </button>
                <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full px-4 py-3 sm:px-6 sm:py-3 shadow-lg hover:from-blue-500 hover:to-blue-600 transition duration-300 text-xs sm:text-sm font-medium">
                    Transaction Log
                </button>
            </div>
        </div>
    );
}

export default Dashboard;

import React, { useState } from "react";

const dashboardDetails = [
    { roomName: "room1", id: 1, members: ["member1", "member2", "member3"], balances: [1, 2, 3] },
    { roomName: "room2", id: 2, members: ["member1", "member2", "member3"], balances: [1, 2, 3] }
  ];
  
  function Dashboard() {

    const handleSearchingMembers = (event) => {
        // implement the search logic here
        console.log(event.target.value);
        }


    const [newRoomName,setRoomName] = useState(""); 

    const [members,setMembers] = useState([]);

    const handleAddMembers = (member) => {    
        setMembers([...members,member]);
    }
    
    const handleCreateRoom = () => {
        console.log(newRoomName);
        console.log(members);
        // implement the create room logic here
    }

    const handleRoomName = (event) => {
        setRoomName(event.target.value);
    }

    return (
      <div className="flex flex-col items-center justify-center">
        {/* Rendering each room */}
        {dashboardDetails.map((room, index) => (
          <div key={index} className="mb-8 w-full">
            <h2 className="text-xl font-bold mb-4">{room.roomName}</h2>
            {/* Summary table */}
            <section>
              <table className="min-w-full table-auto border-collapse border border-green-600">
                <thead>
                  <tr>
                    {room.members.map((member, i) => (
                      <th key={i} className="bg-green-500 p-2 border border-green-600 text-white">
                        {member}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {room.balances.map((balance, i) => (
                      <td key={i} className="bg-green-400 p-2 border border-green-600 text-white">
                        {balance}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              {/* Popup button placeholder */}
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add a Member</button>
            </section>
          </div>
        ))}
  
        {/* Section for adding a new room */}
        <section className="mt-8 w-full max-w-md">
          <h3 className="text-lg font-bold mb-4">Create a New Room</h3>
          <div className="mb-4">
            <label className="block mb-2">Room Name</label>
            <input type="text" onChange={handleRoomName} value={newRoomName} className="w-full p-2 border rounded" placeholder="Enter room name" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Add Members</label>
            <input type="text" onChange={handleSearchingMembers}  className="w-full p-2 border rounded" placeholder="Search for members" />
            <ul>
                {members.map((member, index) => (
                    <li key={index}>{member} <button onClick={() => handleAddMembers(member)}>Add</button></li>
                ))}
            </ul>
          </div>
          
          <button onClick={handleCreateRoom} className="bg-green-500 text-white px-4 py-2 rounded">Create Room</button>
        </section>
  
        {/* Section for other buttons */}
        <section className="flex items-center justify-center flex-col mt-8">
          <button className="bg-green-400 rounded-full px-4 py-2 m-2">Do a Transaction</button>
          <button className="bg-green-400 rounded-full px-4 py-2 m-2">Transaction Log</button>
        </section>
      </div>
    );
  }
  
  export default Dashboard;
  
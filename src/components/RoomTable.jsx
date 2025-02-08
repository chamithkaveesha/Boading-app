import AddMemberPopup from "./AddMemberPopup";

import { useState } from 'react';

function RoomTable({ room }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  return (


    <div className="mb-8 w-full">
            <h2 className="text-xl font-bold mb-4">{room.roomName}</h2>
            {/* Summary table */}
            <section>
              <table className="min-w-full table-auto border-collapse border border-green-600">
                <thead>
                  <tr>
                    {room.members.map((member, index) => (
                      <th key={index} className="bg-green-500 p-2 border border-green-600 text-white">
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
              <button onClick={()=>setPopupOpen(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add a Member</button>
              <AddMemberPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
            </section>
          </div>
  );
}

export default RoomTable;
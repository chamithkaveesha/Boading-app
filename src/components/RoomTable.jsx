import AddMemberPopup from "./AddMemberPopup";

import { useState } from 'react';

function RoomTable({ room }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <div className="mb-6 sm:mb-8 w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">{room.roomName}</h2>
        <button 
          onClick={() => setPopupOpen(true)} 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-200 text-sm sm:text-base font-medium"
        >
          Add Member
        </button>
      </div>
      
      {/* Summary table */}
      <section className="overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-green-500 to-green-600">
                {room.members.map((member, index) => (
                  <th key={index} className="p-3 sm:p-4 border border-green-400 text-white font-medium text-sm sm:text-base">
                    {member}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-100">
                {room.balances.map((balance, i) => (
                  <td key={i} className="p-3 sm:p-4 border border-green-300 text-green-800 font-medium text-center text-sm sm:text-base">
                    Rs. {balance}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <AddMemberPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}

export default RoomTable;
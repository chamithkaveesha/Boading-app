import { useState, useEffect } from "react";
import { fetchRoomsByUserId, fetchRoomUsers } from "../api/Dashboard";
import AddRoomPopup from "../components/AddRoomPopup";
import AddMemberPopup from "../components/AddMemberPopup";
import {deleteRoom} from "../api/deleteRoom";
import { useGlobalState } from "../context/GlobalState";
import {getOwner} from "../api/user";
import {getPairwiseBalances,getPaymentsByRoomId} from "../api/payment";
import { useNavigate } from "react-router-dom";

function DashboardAdmin() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingRoomMembers, setLoadingRoomMembers] = useState(true);
  const [createRoomPopup, setCreateRoomPopup] = useState(false);
  const [addMemberPopup, setAddMemberPopup] = useState(false);
  const [updateRooms, setUpdateRooms] = useState(false);  
  const [updateMembers, setUpdateMembers] = useState(false);
  const [memberBalances, setMemberBalances] = useState([]);
  const [memberWiseBalances, setMemberWiseBalances] = useState([]);
  const [payments, setPayments] = useState([]);
  const { room, setRoom } = useGlobalState();
  
  const {user,setUser} = useGlobalState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getOwner();
        setUser(data);
      } catch (err) {
        setError(err);
       
      }
    };

    fetchUser();
  }, []);


  useEffect(() => {
    const loadRooms = async () => {
      setLoadingRooms(true);
      const data = await fetchRoomsByUserId();
      setRooms(data);
      setLoadingRooms(false);
      if (data.length > 0) 
        {setRoom(data[0]);
;
        };
    };
    loadRooms();
  }, [updateRooms]);

 

  useEffect(() => {
    const loadMembers = async () => {
      setLoadingRoomMembers(true);
      const data = await fetchRoomUsers(room.id);
      setMembers(data);
      setLoadingRoomMembers(false);
      if (data.length > 0) setMember(data[0]);
    };
    if (room) loadMembers();
    else {
      setMembers([]);
      setMember(null);
    }
  }, [room, updateMembers ]);

 

  useEffect(() => {
    const loadBalances = async () => {
      if (room && members.length > 0) {
        try {
          const balances = await getPairwiseBalances(room.id);
          const balanceArr = new Array(members.length).fill(0);
          
          for (const balance of balances) {
            for (let i = 0; i < members.length; i++) {
              if (balance.fromUser === members[i].id) {
               balanceArr[i] = balanceArr[i] + balance.balance;
              }
              if(balance.toUser === members[i].id) {
                balanceArr[i] = balanceArr[i] - balance.balance;
              }
            }
          }

          setMemberBalances(balanceArr);
        } catch (error) {
          console.error("Error fetching pairwise balances:", error);
        }
      } else {
      setMemberBalances([]);
    }
    };
    loadBalances();
  }, [room, members, updateMembers]);

  useEffect(() => {
    const loadBalances = async () => {
      if (room && member) {
        try {
          const balances = await getPairwiseBalances(room.id);
          const balanceArr = new Array(members.length).fill(0);
          
          for (const balance of balances) {
            for (let i = 0; i < members.length; i++) {
              if (balance.fromUser === members[i].id) {
                if (balance.toUser === member.id) {
                  balanceArr[i] = balanceArr[i] - balance.balance;
                }
               
              }
              if(balance.toUser === members[i].id) {
                if (balance.fromUser === member.id) {
                  balanceArr[i] = balanceArr[i] + balance.balance;
                }
                
              }
            }
          }

          setMemberWiseBalances(balanceArr);
        } catch (error) {
          console.error("Error fetching memberwise balances:", error);
        }
      } else {
      setMemberBalances([]);
    }
    };
    loadBalances();
  }, [room, member, members, updateMembers]);

  useEffect(() => {
    const loadPayments = async () => {
      if (room) {
        try {
          const paymentsData = await getPaymentsByRoomId(room.id, 0, 10);
          setPayments(paymentsData);
        }
        catch(error){
          console.error("Error fetching payments:", error);
        }
      }
    };
    loadPayments();
  }, [room]);

  const handleSelectRoom = (room) => {
    setRoom(room);
    }

  const handleRoomCreated = () => {
    setCreateRoomPopup(false);
    setUpdateRooms(!updateRooms);
  }

  const handleMemberAdded = () => {
    setAddMemberPopup(false);
    setUpdateMembers(!updateMembers);
  }

  const handleDeleteRoom = async () => {
    if (room) {
      try {

        await deleteRoom(room.id);
        const newRooms = rooms.filter((r) => r.id !== room.id);
        setRooms(newRooms);
        setRoom(newRooms[0] || null); 
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };
  

  const handleViewAllPayments = () => {
    if (room) {
      navigate(`/transactionlog`);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col pt-6">
      {/* Header */}
      {/* <div className="flex-shrink-0 p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Boarding Management</h1>
        <p className="text-gray-600">Manage rooms, members, and payments</p>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Rooms Sidebar */}
          <div className="col-span-2">
            <div className="bg-white rounded-2xl shadow-xl h-full overflow-hidden">
              <div className="bg-gradient-to-r from-black to-green-700 p-4">
                <h2 className="text-lg font-bold text-white text-center">ROOMS</h2>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto" style={{maxHeight: 'calc(100vh - 300px)'}}>
                {loadingRooms ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {rooms.map((roomItem) => (
                      <button
                        key={roomItem.id}
                        onClick={() => handleSelectRoom(roomItem)}
                        className={`w-full p-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-sm ${
                          room?.id === roomItem.id 
                            ? 'bg-green-600 text-white shadow-lg scale-105' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold truncate">{roomItem.name}</span>
                          {room?.id === roomItem.id && (
                            <div className="w-2 h-2 bg-white rounded-full ml-2 flex-shrink-0"></div>
                          )}
                        </div>
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCreateRoomPopup(true)}
                      className="w-full p-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                    >
                      <div className="flex items-center justify-center">
                        <span className="text-lg mr-1">+</span>
                        <span>Add Room</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <AddRoomPopup
              isOpen={createRoomPopup}
              onClose={() => setCreateRoomPopup(false)}
              onRoomCreated={handleRoomCreated}
            />
          </div>

          {/* Main Content */}
          <div className="col-span-10">
            <div className="bg-white rounded-2xl shadow-xl h-full overflow-hidden">
              {/* Room Header */}
              <div className="bg-gradient-to-r from-green-700 to-black p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {room ? room.name : "Select a Room"}
                    </h2>
                    <p className="text-green-100 mt-1">
                      {room ? `Manage ${room.name} details` : "Choose a room to get started"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {room && (
                      <div className="text-right">
                        <div className="text-green-100 text-sm">Active Members</div>
                        <div className="text-2xl font-bold text-white">{members.length}</div>
                      </div>
                    )}
                    {room && (
                      <button 
                        className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2 rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 text-sm"
                        onClick={handleDeleteRoom}
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-2">🗑️</span>
                          <span>Delete Room</span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {room ? (
                <div className="grid grid-cols-12 h-full">
                  {/* Members Section */}
                  <div className="col-span-3 border-r border-gray-200">
                    <div className="h-full flex flex-col">
                      <div className="bg-gray-800 p-3 flex-shrink-0">
                        <h3 className="text-lg font-bold text-white text-center">MEMBERS</h3>
                      </div>
                      
                      <div className="p-1"></div>
                      
                      <div className="p-3 flex-1 overflow-y-auto" style={{maxHeight: 'calc(100vh - 400px)'}}>
                        {loadingRoomMembers ? (
                          <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {members.map((memberItem, index) => (
                              <div
                                key={index}
                                onClick={() => setMember(memberItem)}
                                className={`cursor-pointer p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                                  member?.id === memberItem.id 
                                    ? 'bg-green-50 border-2 border-green-500 shadow-lg scale-105' 
                                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:shadow-md'
                                }`}
                              >
                                <div className="text-center">
                                  <div className="bg-gray-800 text-white rounded-lg px-3 py-1 font-semibold mb-2 text-sm">
                                    {memberItem.name}
                                  </div>
                                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                                    memberBalances[index] < 0 
                                      ? 'bg-red-100 text-red-700 border border-red-200' 
                                      : 'bg-green-100 text-green-700 border border-green-200'
                                  }`}>
                                    {memberBalances.length > 0 && memberBalances[index] !== undefined 
                                      ? `${memberBalances[index] >= 0 ? '+' : ''}$${Math.abs(memberBalances[index])}` 
                                      : 'Loading...'}
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            <button
                              onClick={() => setAddMemberPopup(true)}
                              className="w-full p-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                            >
                              <div className="flex items-center justify-center">
                                <span className="text-lg mr-1">+</span>
                                <span>Add Member</span>
                              </div>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {addMemberPopup && room && (
                      <AddMemberPopup
                        isOpen={addMemberPopup}
                        onClose={() => setAddMemberPopup(false)}
                        room={room}
                        onMemberAdded={handleMemberAdded}
                      />
                    )}
                  </div>

                  {/* Member Details & Payment Log */}
                  <div className="col-span-9">
                    <div className="h-full flex flex-col">
                      {/* Member Details Header */}
                      <div className="bg-gray-800 p-4 flex items-center justify-between flex-shrink-0">
                        <h3 className="text-xl font-bold text-white">
                          {member ? `${member.name}'s Balance Details` : "Select a Member"}
                        </h3>
                        <div className="flex space-x-3">
                          {member && (
                            <>
                              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium">
                                Add Payment
                              </button>
                              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium">
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-1">
                        {/* Member Balance Details */}
                        <div className="w-1/3 border-r border-gray-200 p-4 flex flex-col">
                          {member ? (
                            <div className="flex flex-col h-full">
                              <div className="text-center mb-4 flex-shrink-0">
                                <div className="text-xl font-bold text-gray-800">{member.name}</div>
                                <div className="text-sm text-gray-600">Balance with others</div>
                              </div>
                              
                              <div className="flex-1 overflow-y-auto space-y-3" style={{maxHeight: 'calc(100vh - 500px)'}}>
                                {members.map((memberItem, index) => (
                                  <div
                                    key={index}
                                    className="p-3 rounded-lg bg-gray-50 border border-gray-200"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-gray-800 text-sm">{memberItem.name}</span>
                                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                        memberWiseBalances[index] > 0 
                                          ? 'bg-red-100 text-red-700' 
                                          : 'bg-green-100 text-green-700'
                                      }`}>
                                        {memberWiseBalances.length > 0 && memberWiseBalances[index] !== undefined 
                                          ? `${memberWiseBalances[index] >= 0 ? '+' : ''}${Math.abs(memberWiseBalances[index])}` 
                                          : 'Loading...'}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-500">
                              <div className="text-center">
                                <div className="text-4xl mb-4">👤</div>
                                <div>Select a member to view balance details</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Payment Log */}
                        <div className="flex-1 p-4">
                          <div className="h-full flex flex-col">
                            <div className="mb-4 flex-shrink-0">
                              <h4 className="text-lg font-bold text-gray-800 mb-2">Recent Payments</h4>
                              <div className="text-sm text-gray-600">Latest transactions in this room</div>
                            </div>
                            
                            <div className="flex-1 bg-gray-50 rounded-xl overflow-hidden" style={{maxHeight: 'calc(100vh - 500px)'}}>
                              <div className="h-full overflow-auto">
                                <table className="w-full">
                                  <thead className="sticky top-0 bg-gray-800 text-white">
                                    <tr>
                                      <th className="p-3 text-left font-semibold">Date</th>
                                      <th className="p-3 text-left font-semibold">From</th>
                                      <th className="p-3 text-left font-semibold">Amount</th>
                                      <th className="p-3 text-left font-semibold">Type</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {payments.length > 0 ? payments.map((payment, index) => {
                                      const fromUser = members.find(m => m.id === payment.fromUserId);
                                      
                                      return (
                                        <tr key={payment.paymentId} className={`border-b border-gray-200 hover:bg-white transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                          <td className="p-3">
                                            <div className="text-sm font-medium text-gray-800">
                                              {new Date(payment.paymentTimestamp).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                              {new Date(payment.paymentTimestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </div>
                                          </td>
                                          <td className="p-3">
                                            <div className="font-medium text-gray-800">
                                              {fromUser?.name || 'Unknown'}
                                            </div>
                                            <div className="text-xs text-gray-500 truncate">
                                              {payment.description || 'No description'}
                                            </div>
                                          </td>
                                          <td className="p-3">
                                            <div className={`font-bold ${payment.isRepayment ? 'text-green-600' : 'text-green-600'}`}>
                                              ${payment.amount}
                                            </div>
                                          </td>
                                          <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                              payment.isRepayment 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-green-100 text-green-800'
                                            }`}>
                                              {payment.isRepayment ? 'Repayment' : 'Payment'}
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    }) : (
                                      <tr>
                                        <td colSpan="4" className="p-8 text-center text-gray-500">
                                          <div className="flex flex-col items-center">
                                            <div className="text-4xl mb-2">💳</div>
                                            <div>No payments found</div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            
                            <div className="mt-4 text-center flex-shrink-0">
                              <button onClick={handleViewAllPayments} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 shadow-md">
                                View All Payments
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏠</div>
                    <div className="text-xl font-semibold mb-2">No Room Selected</div>
                    <div>Please select a room from the sidebar to get started</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;

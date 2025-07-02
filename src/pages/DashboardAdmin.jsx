import { useState, useEffect } from "react";
import { fetchRoomsByUserId, fetchRoomUsers } from "../api/Dashboard";
import AddRoomPopup from "../components/AddRoomPopup";
import AddMemberPopup from "../components/AddMemberPopup";
import AddAccountPopup from "../components/AddAccountPopup";
import ConfirmationModal from "../components/ConfirmationModal";
import {deleteRoom} from "../api/deleteRoom";
import { useGlobalState } from "../context/GlobalState";
import { useCurrency } from "../context/CurrencyContext";
import {getOwner} from "../api/user";
import {getPairwiseBalances,getPaymentsByRoomId} from "../api/payment";
import { useNavigate } from "react-router-dom";
import { deleteUserFromRoom, addAccountToMember } from "../api/room";
import { useToast } from "../components/ToastProvider";


function DashboardAdmin() {
  const navigate = useNavigate();
  const { formatCurrencyWithSign, formatCurrency, currency, setCurrency } = useCurrency();
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const [rooms, setRooms] = useState([]);
  
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingRoomMembers, setLoadingRoomMembers] = useState(true);
  const [createRoomPopup, setCreateRoomPopup] = useState(false);
  const [addMemberPopup, setAddMemberPopup] = useState(false);
  const [addAccountPopup, setAddAccountPopup] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteUserConfirmationOpen, setDeleteUserConfirmationOpen] = useState(false);
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
      try {
        const data = await fetchRoomsByUserId();
        setRooms(data || []);
        
        // Only set room if we have rooms and no room is currently selected
        if (data && data.length > 0 && !room) {
          setRoom(data[0]);
        } else if (!data || data.length === 0) {
          // Clear room selection if no rooms found
          setRoom(null);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRooms([]);
        setRoom(null);
        
        // Show user-friendly error message
        if (error.message.includes("Authentication failed") || error.message.includes("log in again")) {
          showError("Your session has expired. Please log in again.");
          // You might want to redirect to login page here
        } else if (error.message.includes("Access denied")) {
          showError("You don't have permission to view rooms.");
        } else {
          showWarning("No rooms found. Create your first room to get started!");
        }
      } finally {
        setLoadingRooms(false);
      }
    };
    loadRooms();
  }, [updateRooms]);

 

  useEffect(() => {
    const loadMembers = async () => {
      setLoadingRoomMembers(true);
      try {
        const data = await fetchRoomUsers(room.id);
        setMembers(data || []);
        
        // Only set member if we have members and no member is currently selected
        if (data && data.length > 0 && !member) {
          setMember(data[0]);
        } else if (!data || data.length === 0) {
          // Clear member selection if no members found
          setMember(null);
        }
      } catch (error) {
        console.error("Error fetching room members:", error);
        setMembers([]);
        setMember(null);
        
        // Show user-friendly error message
        if (error.message.includes("Authentication failed") || error.message.includes("log in again")) {
          showError("Your session has expired. Please log in again.");
        } else if (error.message.includes("Access denied")) {
          showError("You don't have permission to view room members.");
        } else {
          showWarning("No members found in this room. Add members to get started!");
        }
      } finally {
        setLoadingRoomMembers(false);
      }
    };
    
    if (room) {
      loadMembers();
    } else {
      setMembers([]);
      setMember(null);
      setLoadingRoomMembers(false);
    }
  }, [room, updateMembers]);

 

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
          showError("Failed to load member balances. Please refresh the page and try again.");
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
          showError("Failed to load detailed member balances. Please try selecting the member again.");
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
          showError("Failed to load recent payments. Please refresh the page to try again.");
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
    showSuccess("Room created successfully!");
  }

  const handleMemberAdded = () => {
    setAddMemberPopup(false);
    setUpdateMembers(!updateMembers);
    showSuccess("Member added successfully!");
  }

  const handleDeleteRoom = async () => {
    if (room) {
      try {
        await deleteRoom(room.id);
        const newRooms = rooms.filter((r) => r.id !== room.id);
        setRooms(newRooms);
        setRoom(newRooms[0] || null); 
        setDeleteConfirmationOpen(false);
        showSuccess(`Room "${room.name}" has been successfully deleted.`);
      } catch (error) {
        showError("Failed to delete the room. Please try again or contact support if the problem persists.");
      }
    }
  };

  const handleDeleteRoomClick = () => {
    setDeleteConfirmationOpen(true);
  };
  

  const handleViewAllPayments = () => {
    if (room) {
      navigate(`/transactionlog`);
    }
  };

  const handleDeleteRoomer = async () => {
    if (member && room) {
      try {
        await deleteUserFromRoom(member.id, room.id);
        const newMembers = members.filter((m) => m.id !== member.id);
        setMembers(newMembers); 
        setMember(newMembers[0] || null);
        setUpdateMembers(!updateMembers);
        setDeleteUserConfirmationOpen(false);
        showSuccess(`${member.name} has been successfully removed from ${room.name}.`);
      } catch (error) {
        showError("Failed to remove member from room. Please try again or contact support if the problem persists.");
      }
    }
  };

  const handleDeleteRoomerClick = () => {
    setDeleteUserConfirmationOpen(true);
  };

  const handleAddAccountToMember = async (email) => {
    if (email && room) {
      try {
        await addAccountToMember(email, member.id);
        setAddAccountPopup(false);
        setUpdateMembers(!updateMembers);
        showSuccess(`Account successfully added to ${member.name}.`);
      } catch (error) {
        showError("Failed to add account to member. Please check the email address and try again.");
      }
    }
  };

  const openAddAccountPopup = () => {
    if (member) {
      setAddAccountPopup(true);
    } else {
      showWarning("Please select a member first to add an account.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      {/* Header */}
      {/* <div className="flex-shrink-0 p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Boarding Management</h1>
        <p className="text-gray-600">Manage rooms, members, and payments</p>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-4 flex-1 min-h-0">
          {/* Rooms Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl h-full overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-black to-green-700 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-lg font-bold text-white text-center">ROOMS</h2>
                  {/* Currency Selector */}
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="text-xs bg-white text-gray-800 rounded px-2 sm:px-2 py-1"
                  >
                    <option value="LKR">LKR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </div>
              
              <div className="p-3 sm:p-4 flex-1 overflow-y-auto min-h-0">
                {loadingRooms ? (
                  <div className="flex justify-center items-center h-20 sm:h-40">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-gray-800"></div>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-3">
                    {rooms.length > 0 ? (
                      <>
                        {rooms.map((roomItem) => (
                          <button
                            key={roomItem.id}
                            onClick={() => handleSelectRoom(roomItem)}
                            className={`w-full p-3 sm:p-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm cursor-pointer ${
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
                      </>
                    ) : (
                      <div className="text-center py-6 px-2">
                        <div className="text-3xl sm:text-4xl mb-3">🏠</div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
                          No rooms found.<br />
                          Create your first room to get started!
                        </p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setCreateRoomPopup(true)}
                      className="w-full p-3 sm:p-3 rounded-lg sm:rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-sm cursor-pointer"
                    >
                      <div className="flex items-center justify-center">
                        <span className="text-lg mr-1">+</span>
                        <span>{rooms.length > 0 ? 'Add Room' : 'Create First Room'}</span>
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
          <div className="lg:col-span-10">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl h-full overflow-hidden flex flex-col">
              {/* Room Header */}
              <div className="bg-gradient-to-r from-green-700 to-black p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div>
                      <h2 className="text-xl sm:text-3xl font-bold text-white">
                        {room ? room.name : "Select a Room"}
                      </h2>
                      <p className="text-green-100 mt-1 text-sm sm:text-base">
                        {room ? `Manage ${room.name} details` : "Choose a room to get started"}
                      </p>
                    </div>
                    {room && (
                      <button 
                        className="bg-red-700 hover:bg-red-800 text-white font-bold px-3 sm:px-4 py-2 sm:py-2 rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm cursor-pointer"
                        onClick={handleDeleteRoomClick}
                      >
                        <div className="flex items-center">
                          <span className="text-sm sm:text-lg mr-1 sm:mr-2">🗑️</span>
                          <span className="hidden sm:inline">Delete Room</span>
                          <span className="sm:hidden">Delete</span>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    {room && (
                      <div className="text-right">
                        <div className="text-green-100 text-xs sm:text-sm">Active Members</div>
                        <div className="text-lg sm:text-2xl font-bold text-white">{members.length}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {room ? (
                <div className="flex flex-col lg:grid lg:grid-cols-12 flex-1 min-h-0 gap-4 lg:gap-0">
                  {/* Members Section */}
                  <div className="lg:col-span-3 lg:border-r border-gray-200">
                    <div className="h-full flex flex-col">
                      <div className="bg-gray-800 p-3 sm:p-3 flex-shrink-0">
                        <h3 className="text-sm sm:text-lg font-bold text-white text-center">MEMBERS</h3>
                      </div>
                      
                      <div className="p-1"></div>
                      
                      <div className="p-3 sm:p-3 flex-1 overflow-y-auto min-h-0">
                        {loadingRoomMembers ? (
                          <div className="flex justify-center items-center h-20 sm:h-40">
                            <div className="animate-spin rounded-full h-4 w-4 sm:h-6 sm:w-6 border-b-2 border-gray-600"></div>
                          </div>
                        ) : (
                          <div className="space-y-2 sm:space-y-2 lg:space-y-2">
                            {members.map((memberItem, index) => (
                              <div
                                key={index}
                                onClick={() => setMember(memberItem)}
                                className={`cursor-pointer p-3 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 ${
                                  member?.id === memberItem.id 
                                    ? 'bg-green-50 border-2 border-green-500 shadow-lg scale-105' 
                                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:shadow-md'
                                }`}
                              >
                                <div className="text-center">
                                  <div className="bg-gray-800 text-white rounded-md lg:rounded-lg px-2 sm:px-3 py-1 font-semibold mb-2 sm:mb-2 text-xs sm:text-sm">
                                    {memberItem.name}
                                  </div>
                                  <div className={`inline-block px-2 sm:px-2 py-1 rounded-full text-xs font-bold ${
                                    memberBalances[index] < 0 
                                      ? 'bg-red-100 text-red-700 border border-red-200' 
                                      : 'bg-green-100 text-green-700 border border-green-200'
                                  }`}>
                                    {memberBalances.length > 0 && memberBalances[index] !== undefined 
                                      ? formatCurrencyWithSign(memberBalances[index])
                                      : 'Loading...'}
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            <button
                              onClick={() => setAddMemberPopup(true)}
                              className="w-full p-3 sm:p-3 rounded-lg sm:rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-sm cursor-pointer"
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
                  <div className="lg:col-span-9">
                    <div className="h-full flex flex-col">
                      {/* Member Details Header */}
                      <div className="bg-gray-800 p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
                        <h3 className="text-sm sm:text-xl font-bold text-white">
                          {member ? `${member.name}'s Balance Details` : "Select a Member"}
                        </h3>
                        <div className="flex space-x-2 sm:space-x-3">
                          {member && (
                            <>
                              <button onClick={openAddAccountPopup} className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm font-medium cursor-pointer">
                                <span className="hidden sm:inline">Add Account</span>
                                <span className="sm:hidden">Add</span>
                              </button>
                              <button onClick={handleDeleteRoomerClick} className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm font-medium cursor-pointer">
                                <span className="hidden sm:inline">Remove</span>
                                <span className="sm:hidden">Remove</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row flex-1">
                        {/* Member Balance Details */}
                        <div className="lg:w-1/3 lg:border-r border-gray-200 p-3 sm:p-4 flex flex-col">
                          {member ? (
                            <div className="flex flex-col h-full">
                              <div className="text-center mb-3 sm:mb-4 flex-shrink-0">
                                <div className="text-lg sm:text-xl font-bold text-gray-800">{member.name}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Balance with others</div>
                              </div>
                              
                              <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-3 min-h-0">
                                {members.filter(memberItem => memberItem.id !== member.id).map((memberItem, index) => {
                                  const originalIndex = members.findIndex(m => m.id === memberItem.id);
                                  return (
                                    <div
                                      key={memberItem.id}
                                      className="p-3 sm:p-3 rounded-lg bg-gray-50 border border-gray-200 relative group"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-800 text-xs sm:text-sm">{memberItem.name}</span>
                                        <span className={`px-2 sm:px-2 py-1 rounded-full text-xs font-bold ${
                                          memberWiseBalances[originalIndex] > 0 
                                            ? 'bg-green-100 text-green-700 border border-green-200' 
                                            : memberWiseBalances[originalIndex] < 0
                                            ? 'bg-red-100 text-red-700 border border-red-200'
                                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                                        }`}>
                                          {memberWiseBalances.length > 0 && memberWiseBalances[originalIndex] !== undefined 
                                            ? formatCurrencyWithSign(memberWiseBalances[originalIndex])
                                            : 'Loading...'}
                                        </span>
                                      </div>
                                      
                                      {/* Tooltip */}
                                      {memberWiseBalances.length > 0 && memberWiseBalances[originalIndex] !== undefined && memberWiseBalances[originalIndex] !== 0 && (
                                        <div className={`absolute left-1/2 transform -translate-x-1/2 px-2 sm:px-3 py-1 sm:py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 ${
                                          index === 0 ? 'top-full mt-2' : 'bottom-full mb-2'
                                        }`}>
                                          {memberWiseBalances[originalIndex] > 0 
                                            ? `${memberItem.name} has to give you ${formatCurrency(Math.abs(memberWiseBalances[originalIndex]))}` 
                                            : `You have to give ${memberItem.name} ${formatCurrency(Math.abs(memberWiseBalances[originalIndex]))}`}
                                          {/* Tooltip arrow */}
                                          <div className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent ${
                                            index === 0 
                                              ? 'bottom-full border-b-4 border-b-gray-800' 
                                              : 'top-full border-t-4 border-t-gray-800'
                                          }`}></div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-500">
                              <div className="text-center">
                                <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">👤</div>
                                <div className="text-xs sm:text-sm">Select a member to view balance details</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Payment Log */}
                        <div className="flex-1 p-3 sm:p-4">
                          <div className="h-full flex flex-col">
                            <div className="mb-3 sm:mb-4 flex-shrink-0">
                              <h4 className="text-sm sm:text-lg font-bold text-gray-800 mb-2 sm:mb-2">Recent Payments</h4>
                              <div className="text-xs sm:text-sm text-gray-600">Latest transactions in this room</div>
                            </div>
                            
                            <div className="flex-1 bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden">
                              <div className="h-full overflow-auto">
                                <table className="w-full">
                                  <thead className="sticky top-0 bg-gray-800 text-white">
                                    <tr>
                                      <th className="p-3 sm:p-3 text-left font-semibold text-xs sm:text-sm">Date</th>
                                      <th className="p-3 sm:p-3 text-left font-semibold text-xs sm:text-sm">From</th>
                                      <th className="p-3 sm:p-3 text-left font-semibold text-xs sm:text-sm">Amount</th>
                                      <th className="p-3 sm:p-3 text-left font-semibold text-xs sm:text-sm">Type</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {payments.length > 0 ? payments.map((payment, index) => {
                                      const fromUser = members.find(m => m.id === payment.fromUserId);
                                      
                                      return (
                                        <tr key={payment.paymentId} className={`border-b border-gray-200 hover:bg-white transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                          <td className="p-3 sm:p-3">
                                            <div className="text-xs sm:text-sm font-medium text-gray-800">
                                              {new Date(payment.paymentTimestamp).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                              {new Date(payment.paymentTimestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </div>
                                          </td>
                                          <td className="p-3 sm:p-3">
                                            <div className="font-medium text-gray-800 text-xs sm:text-sm">
                                              {fromUser?.name || 'Unknown'}
                                            </div>
                                            <div className="text-xs text-gray-500 truncate">
                                              {payment.description || 'No description'}
                                            </div>
                                          </td>
                                          <td className="p-3 sm:p-3">
                                            <div className={`font-bold text-xs sm:text-sm ${payment.isRepayment ? 'text-green-600' : 'text-green-600'}`}>
                                              {formatCurrency(payment.amount)}
                                            </div>
                                          </td>
                                          <td className="p-3 sm:p-3">
                                            <span className={`px-2 sm:px-2 py-1 rounded-full text-xs font-medium ${
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
                                        <td colSpan="4" className="p-6 sm:p-8 text-center text-gray-500">
                                          <div className="flex flex-col items-center">
                                            <div className="text-2xl sm:text-4xl mb-2 sm:mb-2">💳</div>
                                            <div className="text-xs sm:text-sm">No payments found</div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            
                            <div className="mt-3 sm:mt-4 text-center flex-shrink-0">
                              <button onClick={handleViewAllPayments} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 sm:py-2 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md text-xs sm:text-sm cursor-pointer">
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
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">🏠</div>
                    <div className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">No Room Selected</div>
                    <div className="text-sm sm:text-base">Please select a room from the sidebar to get started</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={handleDeleteRoom}
        title="Delete Room"
        message={`Are you sure you want to delete "${room?.name}"? This action cannot be undone and will permanently remove all room data, members, and transaction history.`}
        confirmText="Delete Room"
        cancelText="Cancel"
        isDangerous={true}
      />

      {/* User Removal Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteUserConfirmationOpen}
        onClose={() => setDeleteUserConfirmationOpen(false)}
        onConfirm={handleDeleteRoomer}
        title="Remove Member"
        message={`Are you sure you want to remove "${member?.name}" from "${room?.name}"? This action will remove the member from the room but their transaction history will be preserved.`}
        confirmText="Remove Member"
        cancelText="Cancel"
        isDangerous={true}
      />

      {/* Add Account Modal */}
      <AddAccountPopup
        isOpen={addAccountPopup}
        onClose={() => setAddAccountPopup(false)}
        onAddAccount={handleAddAccountToMember}
        memberName={member?.name}
      />
    </div>
  );
}

export default DashboardAdmin;

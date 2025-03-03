import { useState, useEffect } from "react";
import { fetchRoomsByUserId, fetchRoomUsers } from "../api/Dashboard";
import AddRoomPopup from "../components/AddRoomPopup";
import AddMemberPopup from "../components/AddMemberPopup";
import {deleteRoom} from "../api/deleteRoom";
import { useGlobalState } from "../context/GlobalState";
import {getOwner} from "../api/user";

function DashboardAdmin() {


  const [rooms, setRooms] = useState([]);
  
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingRoomMembers, setLoadingRoomMembers] = useState(true);
  const [createRoomPopup, setCreateRoomPopup] = useState(false);
  const [addMemberPopup, setAddMemberPopup] = useState(false);
  const [updateRooms, setUpdateRooms] = useState(false);  
  const [updateMembers, setUpdateMembers] = useState(false);  
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
  }, [room, updateMembers]);

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
  

  return (
    <div className="flex justify-center items-center relative">
      <main className="flex gap-1 h-150 w-screen m-5">
        {/* Rooms List */}
        <aside className="w-1/10 text-center bg-gray-200 rounded-sm flex flex-col">
          <h2 className="text-2xl py-5 my-1">ROOMS</h2>
          <div className="flex flex-col text-amber-50 text-sm h-full justify-center">
            {loadingRooms && <p>Loading...</p>}
            {!loadingRooms && rooms.map((room) => (
              <span
                key={room.id}
                onClick={() => handleSelectRoom(room)}
                className="cursor-pointer bg-black rounded-sm mb-1 mx-2 p-1"
              >
                {room.name}
              </span>
            ))}
            <button
              onClick={() => setCreateRoomPopup(true)}
              className="cursor-pointer bg-black rounded-sm mb-1 mx-2 p-1"
            >
              +
            </button>
            <AddRoomPopup
              isOpen={createRoomPopup}
              onClose={() => setCreateRoomPopup(false)}
              onRoomCreated={handleRoomCreated}
            />
          </div>
        </aside>

        {/* Room Details */}
        <section className="w-9/10 text-center bg-gray-200 rounded-sm flex flex-col">
        <div className=" flex items-center justify-center">
          <h2 className="text-3xl p-5">{room ? room.name : "loading..."}</h2>
          
        </div>
          
          <div className="bg-green-100 m-1 rounded-sm flex h-full justify-center">
            {/* Members List */}
            <aside className="w-1/6 flex flex-col">
              <h3 className="text-2xl p-5">MEMBERS</h3>
              <div className="flex flex-col text-sm text-amber-50 justify-center h-full">
                {!loadingRoomMembers && members.map((member, index) => (
                  <div
                    key={index}
                    onClick={() => setMember(member)}
                    className="bg-gray-600 rounded-sm mb-1 mx-2 flex flex-col"
                  >
                    <div className="bg-black rounded-sm px-1">
                      <span>{member.name}</span>
                    </div>
                    <span className="text-xxs text-green-400">+500</span>
                  </div>
                ))}
                <button
                  onClick={() => setAddMemberPopup(true)}
                  className="bg-black rounded-sm mb-1 mx-2"
                >
                  +
                </button>
                {addMemberPopup && room && (
                  <AddMemberPopup
                    isOpen={addMemberPopup}
                    onClose={() => setAddMemberPopup(false)}
                    room={room}
                    onMemberAdded={handleMemberAdded}
                  />
                )}
              </div>
            </aside>

            {/* Member Balance */}
            <section className="w-1/6 bg-green-50 flex flex-col items-center">
              <h3 className="p-5 text-2xl">{member && member.name}</h3>
              <button className="bg-green-700 rounded-sm p-1 text-xxs text-amber-50 mb-3">
                ADD Account
              </button>
              <button className="bg-red-700 rounded-sm p-1 text-xxs text-amber-50 mb-10">
                DELETE
              </button>
            </section>

            {/* Payment Log */}
            <section className="w-4/6 bg-green-100 rounded-tr-sm rounded-br-sm">
              <h3 className="text-2xl p-5">PAYMENT LOG</h3>
              <button className="text-xxs bg-green-600 rounded-sm px-1">
                view more
              </button>
            </section>
          </div>
        </section>
      </main>
      {
        room?
          <button className=" bg-red-600 rounded-sm p-1  text-amber-50 mb-10 absolute right-20 bottom-10 cursor-pointer hover:bg-red-500 transition" onClick={handleDeleteRoom}>
            DELETE ROOM
        </button>:null
        
      }
    </div>
  );
}

export default DashboardAdmin;

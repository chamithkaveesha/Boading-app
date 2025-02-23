import { useState, useEffect } from "react";
import { fetchRoomsByUserId, fetchRoomUsers } from "../api/Dashboard";
import AddRoomPopup from "../components/AddRoomPopup";
import AddMemberPopup from "../components/AddMemberPopup";

function DashboardAdmin() {
  const userId = 5;
  const token = sessionStorage.getItem("token");

  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingRoomMembers, setLoadingRoomMembers] = useState(true);
  const [createRoomPopup, setCreateRoomPopup] = useState(false);
  const [addMemberPopup, setAddMemberPopup] = useState(false);

  useEffect(() => {
    const loadRooms = async () => {
      setLoadingRooms(true);
      const data = await fetchRoomsByUserId(userId, token);
      setRooms(data);
      setLoadingRooms(false);
      if (data.length > 0) setRoom(data[0]);
    };
    loadRooms();
  }, [userId, token]);

  useEffect(() => {
    const loadMembers = async () => {
      setLoadingRoomMembers(true);
      const data = await fetchRoomUsers(room?.id, token);
      setMembers(data);
      setLoadingRoomMembers(false);
      if (data.length > 0) setMember(data[0]);
    };
    if (room) loadMembers();
  }, [room, token]);

  const handleSelectRoom = (room) => setRoom(room);

  return (
    <div className="flex justify-center items-center">
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
              token={token}
            />
          </div>
        </aside>

        {/* Room Details */}
        <section className="w-9/10 text-center bg-gray-200 rounded-sm flex flex-col">
          <h2 className="text-3xl p-5">{room ? room.name : "loading..."}</h2>
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
                    token={token}
                    room={room}
                  />
                )}
              </div>
            </aside>

            {/* Member Balance */}
            <section className="w-1/6 bg-green-50 flex flex-col items-center">
              <h3 className="p-5 text-2xl">{member && member.name}</h3>
              <button className="bg-green-700 rounded-sm p-1 text-xxs text-amber-50 mb-10">
                ADD Account
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
    </div>
  );
}

export default DashboardAdmin;

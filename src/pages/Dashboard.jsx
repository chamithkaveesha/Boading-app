const roomName  = "room name";

function Dashboard(){
    return(
        <div className="flex flex-col items-center justify-center">

            <h2>{roomName}</h2>
            {/* secction for the summery table */}
            <section >
                <table className="min-w-full table-auto ">
                    <thead>
                        <tr>
                            <th className="bg-green-500 p-2 border-2 border-green-600  text-white">member1</th>
                            <th className="bg-green-500 p-2 border-2 border-green-600 text-white">member2</th>
                            <th className="bg-green-500 p-2 border-2 border-green-600 text-white">member3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="bg-green-300 p-2 border-2 border-green-500 text-center">+300</td>
                            <td className="bg-green-300 p-2 border-2 border-green-500 text-center">-200</td>
                            <td className="bg-green-300 p-2 border-2 border-green-500 text-center">+500</td>
                        </tr>
                    </tbody>
                </table>
                {/* this should be a popup window */}
                <button>Add a member</button>
            </section>

            <section>

                <section>
                    <label>Add members</label>
                    <input></input>
                    <p>
                        {/* display search results all are selectable */}
                    </p>
                    <button>Add</button> 
                </section>

                <label>Room name</label>
                    <input type="text"></input>
                <button>create room</button>
            </section>

            {/* section for the other buttons */}
            <section className="flex items-center justify-center flex-col">
                <button className="bg-green-400 rounded-full px-4 cursor-pointer m-2">Do a Transaction</button>
                <button className="bg-green-400 rounded-full px-4 cursor-pointer m-2">Transaction Log</button>
            </section>
        </div>
    );

}

export default Dashboard;
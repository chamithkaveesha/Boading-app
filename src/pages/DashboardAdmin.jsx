

function DashboardAdmin() {
  return (
    <div className="flex  justify-center items-center">
      <main className="flex gap-1 h-150 w-screen m-5  ">
        {/* rooms */}
        <aside className="w-1/10 text-center bg-gray-200 rounded-sm flex flex-col">
          <h2 className="text-2xl py-5 my-1">ROOMS</h2>
          <div className="flex flex-col text-amber-50 text-sm h-full justify-center">
            <span className="bg-black rounded-sm mb-1 mx-2 p-1">ROOM1</span>
            <span className="bg-black rounded-sm mb-1 mx-2 p-1">ROOM2</span>
            <span className="bg-black rounded-sm mb-1 mx-2 p-1">ROOM3</span>
            {/* add room button */}
            <button className="bg-black rounded-sm mb-1 mx-2 p-1">+</button>
          </div>
        </aside>
          
        {/* room details */}
        <section className="w-9/10 text-center bg-gray-200 rounded-sm flex flex-col">
          <h2 className="text-3xl p-5">ROOM1</h2>
          <div className="bg-green-100 m-1  rounded-sm flex h-full justify-center ">
            {/* members' names */}
            <aside className="w-1/6 flex flex-col">
              <h3 className="text-2xl p-5">MEMBERS</h3>
              <div className="flex flex-col text-sm text-amber-50 justify-center h-full">
                <div className="bg-gray-600 rounded-sm mb-1 mx-2 flex flex-col">
                  <div className="bg-black rounded-sm px-1">
                    <span>member1</span>
                  </div>
                  <span className="text-xxs  text-green-400">+500</span>
                </div>

                <div className="bg-gray-600 rounded-sm mb-1 mx-2 flex flex-col">
                  <div className="bg-black rounded-sm px-1">
                    <span>member1</span>
                  </div>
                  <span className="text-xxs text-red-500">-500</span>
                </div>

                <div className="bg-gray-600 rounded-sm mb-1 mx-2 flex flex-col">
                  <div className="bg-black rounded-sm px-1">
                    <span>member1</span>
                  </div>
                  <span className="text-xxs text-green-400">+500</span>
                </div>

                <button className="bg-black rounded-sm mb-1 mx-2 ">+</button>
              </div>
              
            </aside>

            {/* section for member balences */}
            <section className="w-1/6 bg-green-50 flex flex-col items-center">
              <h3 className="p-5 text-2xl">MEMBER1</h3>
              <div className="text-xs w-2/3 flex flex-col justify-center h-full">
                <div className="bg-gray-200 m-1 rounded-sm p-1 relative text-end">
                  <span className="absolute left-0 top-0 bg-green-600 rounded-sm p-1 w-1/2">member1</span>
                  <span className="text-green-500 ">+500</span>
                </div>
                <div className="bg-gray-200 m-1 rounded-sm p-1 relative text-end">
                  <span className="absolute left-0 top-0 bg-green-600 rounded-sm p-1 w-1/2">member1</span>
                  <span className="text-red-500">-500</span>
                </div>
               
              </div>
              <button className="bg-green-700 rounded-sm p-1 text-xxs text-amber-50 mb-10">ADD Account</button>
            </section>

            {/* payment log */}
            <section className=" w-4/6 bg-green-100 rounded-tr-sm rounded-br-sm ">
              <h3 className="text-2xl p-5">PAYMENT LOG</h3>
                <div className="bg-white m-5">
                  <table className="text-xs w-full">
                    <tbody>
                    <tr>
                      <th className="bg-green-300">date</th>
                      <th className="bg-green-200">time</th>
                      <th className="bg-green-300">description</th>
                      <th className="bg-green-200">members</th>
                      <th className="bg-green-300">price (Rs:)</th>
                    </tr>
                    <tr className="bg-white">
                      <td>2025/02/03 </td>
                      <td>03.26 pm </td>
                      <td>light bill november</td>
                      <td>member1,member2</td>
                      <td>200/=</td>
                    </tr>
                    <tr className="bg-green-100">
                      <td>2025/02/03 </td>
                      <td>03.26 pm </td>
                      <td>light bill november</td>
                      <td>member1,member2</td>
                      <td>200/=</td>
                    </tr>
                    
                    <tr className="bg-white">
                      <td>2025/02/03 </td>
                      <td>03.26 pm </td>
                      <td>light bill november</td>
                      <td>member1,member2</td>
                      <td>200/=</td>
                    </tr>
                    <tr className="bg-green-100">
                      <td>2025/02/03 </td>
                      <td>03.26 pm </td>
                      <td>light bill november</td>
                      <td>member1,member2</td>
                      <td>200/=</td>
                    </tr>
                    <tr className="bg-white">
                      <td>2025/02/03 </td>
                      <td>03.26 pm </td>
                      <td>light bill november</td>
                      <td>member1,member2</td>
                      <td>200/=</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <button className=" text-xxs bg-green-600 rounded-sm px-1">view more</button>
            </section>

          </div>
        </section>
      </main>
      
      </div>
  );
}

export default DashboardAdmin;
import { useGlobalState } from "../context/GlobalState";

const name = "name";


function Account(){
    const { room, setRoom } = useGlobalState();

    return (
        <div className=" flex w-full">
            <div className="relative bg-gray-100 m-5 p-5 rounded-sm flex-1">
                <h2 className="text-3xl text-gray-800 pb-2 px-4">ACCOUNT DETAILS</h2>
                <hr className="text-gray-400" />
                <div>
                    <div className="flex justify-between p-4">
                        <h3 className="text-xl text-gray-800">User Name</h3>
                        <p className="text-gray-800">{name}</p>
                    </div>
                    <div className="flex justify-between p-4">
                        <h3 className="text-xl text-gray-800">Email</h3>
                        <p className="text-gray-800">email</p>
                    </div>
                    <div>
                        <button className="absolute bottom-3 right-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">DELETE</button>
                    </div>
                </div>
            </div>
            
        </div>
        );

}

export default Account;



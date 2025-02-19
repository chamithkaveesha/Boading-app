import user from '../assets/user.svg';


function NavBar({ userDetails }) {
    return (
        <nav className="  bg-gradient-to-r from-black to-green-700">
            <div className=" flex justify-between items-center mx-auto py-2 px-4">
                <h1 className="text-lg font-bold text-gray-50 ml-5">බෝඩිම් TIKKA </h1>
                <div className="flex items-center">
                    <span className='text-gray-50 mr-6'>
                        {userDetails ? userDetails.name: "Loading..."}
                    </span>
                    <span className='p-2 mr-5 bg-gray-50 rounded-full flex items-center justify-center'>
                        <img src={user} alt="user" className="w-6 h-6" />
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;


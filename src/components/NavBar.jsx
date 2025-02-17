import user from '../assets/user.svg';
function NavBar(){
    return (
        <nav className="  bg-gradient-to-r from-black to-green-700">
            <div className=" flex justify-between items-center mx-auto py-2 px-4">
                <h1 className="text-lg font-bold text-gray-50">බෝඩිම් TIKKA </h1>
                <span className='p-2 bg-gray-50 rounded-full flex items-center justify-center'>
                    <img src={user} alt="user" className="w-6 h-6" />
             </span>
            </div>
        </nav>
    );
}

export default NavBar;


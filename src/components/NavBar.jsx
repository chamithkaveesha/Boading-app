import user from '../assets/user.svg';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalState';


function NavBar({ userDetails }) {
    const navigate = useNavigate();
    const { setUser } = useGlobalState();

    const handleSignOut = () => {
        // Clear session storage
        sessionStorage.removeItem('token');
        // Clear user from global state
        setUser(null);
        // Redirect to login page
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-black to-green-700 shadow-lg">
            <div className="flex justify-between items-center mx-auto py-3 sm:py-4 px-3 sm:px-6">
                <h1 
                    className="text-base sm:text-lg lg:text-xl font-bold text-gray-50 cursor-pointer hover:text-green-200 transition-all duration-300 transform hover:scale-105"
                    onClick={() => navigate('/dashboardAdmin')}
                >
                    බෝඩිම් TIKKA 
                </h1>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button 
                        onClick={handleSignOut}
                        className="text-gray-50 px-2 sm:px-3 py-1 sm:py-2 rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl cursor-pointer"
                    >
                        Sign Out
                    </button>
                    <span className='text-gray-50 text-xs sm:text-sm hidden sm:block'>
                        {userDetails ? userDetails.name: "Loading..."}
                    </span>
                    
                    <span 
                        className='p-2 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg'
                        onClick={() => navigate('/account')}
                    >
                        <img src={user} alt="user" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;


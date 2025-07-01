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
        <nav className="  bg-gradient-to-r from-black to-green-700">
            <div className=" flex justify-between items-center mx-auto py-2 px-4">
                <h1 
                    className="text-lg font-bold text-gray-50 ml-5 cursor-pointer hover:text-green-200 transition-colors duration-200"
                    onClick={() => navigate('/dashboardAdmin')}
                >
                    බෝඩිම් TIKKA 
                </h1>
                <div className="flex items-center">
                    <button 
                        onClick={handleSignOut}
                        className="text-gray-50 mr-4 px-3 py-1 rounded-md bg-red-700 hover:green-900 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg cursor-pointer"
                    >
                        Sign Out
                    </button>
                    <span className='text-gray-50 mr-6'>
                        {userDetails ? userDetails.name: "Loading..."}
                    </span>
                    
                    <span 
                        className='p-2 mr-5 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-200'
                        onClick={() => navigate('/account')}
                    >
                        <img src={user} alt="user" className="w-6 h-6" />
                    </span>
                 
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

